import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User_WithRelation } from 'src/types/prisma-extended/user-with-relation.type';
import { IMsg } from 'src/auth/interfaces/i-msg.interface';
import { Follow, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  //ユーザーをuserIdで取得
  async getUserById(
    userId: number,
  ): Promise<Omit<User_WithRelation, 'hashedPassword'>> {
    try {
      const user: User_WithRelation =
        await this.prisma.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            questions: true,
            likeQuestions: true,
            books: true,
            followedBy: true,
            following: true,
          },
        });
      return user;
    } catch (err) {
      throw err;
    }
  }

  //ユーザ情報を更新
  async updateUser(
    userId: number,
    dto: UpdateUserDto,
  ): Promise<Omit<User_WithRelation, 'hashedPassword'>> {
    const user: User_WithRelation =
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        include: {
          questions: true,
          likeQuestions: true,
          books: true,
          followedBy: true,
          following: true,
        },
        data: {
          ...dto,
        },
      });
    //updateメソッドは変更後のuserオブジェクトを返す。
    //ハッシュ化されたパスワードも返してしまうため、delete user.hashedPasswordで除いてから返す。
    delete user.hashedPassword;
    return user;
  }

  //ユーザー削除
  async deleteUser(
    userId: number,
    targetId: number,
  ): Promise<IMsg> {
    if (userId === targetId) {
      try {
        const user: User = await this.prisma.user.delete({
          where: {
            id: targetId,
          },
        });
        return {
          message: 'アカウントが削除されました',
        };
      } catch (err) {
        throw err;
      }
    } else {
      throw new ForbiddenException(
        'No permission to delete',
      );
    }
  }

  //ユーザーをフォロー
  async followUser(
    userId: number,
    targetUserId: number,
  ): Promise<IMsg> {
    //フォロー対象が自分自身でない場合、フォローできる
    if (userId !== targetUserId) {
      try {
        //フォロー対象のユーザー
        const targetUser: User & {
          followedBy: Follow[];
          following: Follow[];
        } = await this.prisma.user.findFirst({
          where: {
            id: targetUserId,
          },
          include: {
            followedBy: true,
            following: true,
          },
        });
        //既にフォローしているかどうか
        let isFollowed: boolean = false;
        for (
          let i = 0;
          i < targetUser.followedBy.length;
          i++
        ) {
          if (
            targetUser.followedBy[i].followingId === userId
          ) {
            isFollowed = true;
            break;
          }
        }
        //フォローしていなげればフォローできる
        if (!isFollowed) {
          //Follow(relation)を作成
          await this.prisma.follow.create({
            data: {
              followingId: userId,
              followedId: targetUserId,
            },
          });
          return {
            message: 'フォローに成功しました',
          };
        } else {
          return {
            message: '既にフォローしています',
          };
        }
      } catch (err) {
        throw err;
      }
    } else
      return {
        message: '自分自身をフォローできません',
      };
  }

  //フォロー解除
  async unfollowUser(
    userId: number,
    targetUserId: number,
  ): Promise<IMsg> {
    //フォローを外す対象が自分自身でない場合、フォローを外すことができる
    if (userId !== targetUserId) {
      try {
        //フォローを外す対象のユーザー
        const targetUser: User & {
          following: Follow[];
          followedBy: Follow[];
        } = await this.prisma.user.findFirst({
          where: {
            id: targetUserId,
          },
          include: {
            followedBy: true,
            following: true,
          },
        });
        //フォローをはずず対象のユーザーのfollowedByの中に自分がいた場合、フォローを外せる
        //既にフォローしているかどうか
        let isFollowed: boolean = false;
        for (
          let i = 0;
          i < targetUser.followedBy.length;
          i++
        ) {
          if (
            targetUser.followedBy[i].followingId === userId
          ) {
            isFollowed = true;
            break;
          }
        }
        //フォローしていれば外すことができる
        if (isFollowed) {
          //Follow(relation)を削除
          await this.prisma.follow.delete({
            where: {
              followingId_followedId: {
                followingId: userId,
                followedId: targetUserId,
              },
            },
          });
          return {
            message: 'フォロー解除に成功しました',
          };
        } else {
          return {
            message:
              'フォローしていないのでフォロー解除できません',
          };
        }
      } catch (err) {
        throw err;
      }
    } else
      return {
        message: '自分自身をフォロー解除できません',
      };
  }
}
