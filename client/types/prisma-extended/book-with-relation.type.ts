import { Prisma } from "@prisma/client";

//Prisma-clientから自動生成されたBook型を拡張
const bookWithRelation =
  Prisma.validator<Prisma.BookArgs>()({
    include: { links: true },
  });
export type Book_WithRelation = Prisma.BookGetPayload<
  typeof bookWithRelation
>;
