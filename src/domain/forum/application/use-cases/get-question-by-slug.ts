import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repository';
import { Either, left, right } from '@/shared/either';
import { ResourceNotFound } from './errors/resource-not-found';
import { Injectable } from '@nestjs/common';

type GetQuestionBySlugUseCaseRequest = {
  slug: string;
};

type GetQuestionBySlugUseCaseResponse = Either<ResourceNotFound, { question: Question }>;

@Injectable()
export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({ slug }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionRepository.findBySlug(slug);

    if (!question) {
      return left(new ResourceNotFound());
    }

    return right({ question });
  }
}
