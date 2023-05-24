import { Prisma } from "@prisma/client";

//Prisma-clientから自動生成されたUser型を拡張
const userWithRelation =
  Prisma.validator<Prisma.UserArgs>()({
    include: {
      questions: true,
      books: true,
      likeQuestions: true,
      followedBy: true,
      following: true,
    },
  });
export type User_WithRelation = Prisma.UserGetPayload<
  typeof userWithRelation
>;
