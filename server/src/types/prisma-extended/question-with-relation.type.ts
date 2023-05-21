import { Prisma } from '@prisma/client';

const questionWithRelation = Prisma.validator<Prisma.QuestionArgs>()({
  include: { likes: true, books: true },
});
export type Question_WithRelation = Prisma.QuestionGetPayload<
  typeof questionWithRelation
>;
