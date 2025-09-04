import { Either, left, right } from '@/shared/either';
import { Injectable } from '@nestjs/common';
import { Encrypter } from '../cryptography/encrypter';
import { Hasher } from '../cryptography/hasher';
import { StudentRepository } from '../repositories/student-repository';
import { WrongCredentialsError } from './errors/wrong-credentials-error';

type AuthenticateStudentUseCaseRequest = {
  email: string;
  password: string;
};

type AuthenticateStudentUseCaseResponse = Either<WrongCredentialsError, { accessToken: string }>;

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private studentRepository: StudentRepository,
    private hashComparer: Hasher,
    private encrypter: Encrypter
  ) {}

  async execute({ email, password }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentRepository.findByEmail(email);

    if (!student) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(password, student.password);

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }

    const token = await this.encrypter.encrypt({ sub: student.id.toString() });
    return right({ accessToken: token });
  }
}
