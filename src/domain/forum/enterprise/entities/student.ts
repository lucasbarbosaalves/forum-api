import { Entity } from '@/shared/domain/entities/entity';
import { UniqueEntityID } from './value-objects/unique-entity-id';

type StudentProps = {
  name: string;
  email: string;
  password: string;
};

export class Student extends Entity<StudentProps> {
  static create(props: StudentProps, id?: UniqueEntityID) {
    return new Student(props, id);
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }
}
