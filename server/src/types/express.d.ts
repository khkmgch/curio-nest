import { User_WithRelation } from './prisma-extended/user-with-relation.type';
import { Express } from 'express';

declare global {
  namespace Express {
    interface User extends Omit<User_WithRelation, 'hashedPassword'> {}
  }
}
