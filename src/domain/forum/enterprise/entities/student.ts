import { Entity } from '@/shared/domain/entities/entity';

interface StudentProps {
  name: string;
}

export class Student extends Entity<StudentProps> {}
