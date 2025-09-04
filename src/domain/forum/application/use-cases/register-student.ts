import { Either, left, right } from '@/shared/either';
import { Injectable } from '@nestjs/common';
import { Student } from '../../enterprise/entities/student';
import { Hasher } from '../cryptography/hasher';
import { StudentRepository } from '../repositories/student-repository';
import { StudentAlreadyExistsError } from './errors/student-already-exists-error';

type RegisterStudentUseCaseRequest = {
  name: string;
  email: string;
  password: string;
};

type RegisterStudentUseCaseResponse = Either<StudentAlreadyExistsError, { student: Student }>;

@Injectable()
export class RegisterStudentUseCase {
  constructor(private studentRepository: StudentRepository, private hashGenerator: Hasher) {}

  async execute({ name, email, password }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const studentSameEmailVerify = await this.studentRepository.findByEmail(email);

    if (studentSameEmailVerify) {
      return left(new StudentAlreadyExistsError(email));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const student = Student.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.studentRepository.create(student);

    return right({ student });
  }
}
