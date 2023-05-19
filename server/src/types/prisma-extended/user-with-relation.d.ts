import { Prisma } from '@prisma/client';

const userWithRelation = Prisma.validator<Prisma.UserArgs>()({
  include: {
    questions: true,
    books: true,
    likeQuestions: true,
    followedBy: true,
    following: true,
  },
});
export type User_WithRelation = Prisma.UserGetPayload<typeof userWithRelation>;
