import { Prisma } from '@prisma/client';

const bookWithRelation = Prisma.validator<Prisma.BookArgs>()({
  include: { links: true },
});
export type Book_WithRelation = Prisma.BookGetPayload<typeof bookWithRelation>;
