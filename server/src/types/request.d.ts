import { User_WithRelation } from './prisma-extended/user-with-relation';

declare module 'express-serve-static-core' {
  //標準のExpressのRequest型に対して、userというフィールドを追加。
  //UserからhashedPasswordを除いた型を指定する。
  interface Request {
    user?: Omit<User_WithRelation, 'hashedPassword'>;
  }
}
