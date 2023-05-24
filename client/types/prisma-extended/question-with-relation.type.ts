import { Prisma } from "@prisma/client";

//Prisma-clientから自動生成されたQuestion型を拡張
const questionWithRelation =
  Prisma.validator<Prisma.QuestionArgs>()({
    include: { likes: true, books: true },
  });
export type Question_WithRelation =
  Prisma.QuestionGetPayload<typeof questionWithRelation>;
