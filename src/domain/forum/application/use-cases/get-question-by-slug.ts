import { Either, left, right } from '@/shared/either';
import { Injectable } from '@nestjs/common';
import { QuestionDetails } from '../../enterprise/entities/value-objects/question-details';
import { QuestionRepository } from '../repositories/question-repository';
import { ResourceNotFound } from './errors/resource-not-found';

type GetQuestionBySlugUseCaseRequest = {
  slug: string;
};

type GetQuestionBySlugUseCaseResponse = Either<ResourceNotFound, { question: QuestionDetails }>;

@Injectable()
export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({ slug }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionRepository.findDetailsBySlug(slug);

    if (!question) {
      return left(new ResourceNotFound());
    }

    return right({ question });
  }
}
