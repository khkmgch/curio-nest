import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User_WithRelation } from 'src/types/prisma-extended/user-with-relation.type';
import { IMsg } from 'src/auth/interfaces/i-msg.interface';

//jwtによるプロテクションを'user'の全てのエンドポイントに適用
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //ログインしているユーザーの情報を取得
  @Get()
  getLoginUser(@Req() req: Request) {
    //nestJsではjwt.strategy.ts内のvalidateメソッドの処理の際に、自動的にRequestの中にuserを含めてくれるので、
    //controller内でRequestからユーザー情報にアクセスできる。
    return req.user;
  }
  @Get(':id')
  getUserById(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<Omit<User_WithRelation, 'hashedPassword'>> {
    return this.userService.getUserById(userId);
  }

  //ユーザ情報を更新
  @Patch()
  updateUser(
    @Req() req: Request,
    @Body() dto: UpdateUserDto,
  ): Promise<Omit<User_WithRelation, 'hashedPassword'>> {
    return this.userService.updateUser(req.user.id, dto);
  }

  //ユーザー削除
  @Delete(':id')
  deleteUser(
    @Req() req: Request,
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<IMsg> {
    return this.userService.deleteUser(req.user.id, userId);
  }

  //ユーザーをフォロー
  @Patch(':id/follow')
  followUser(
    @Req() req: Request,
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<IMsg> {
    return this.userService.followUser(req.user.id, userId);
  }

  //ユーザーのフォローを外す
  @Patch(':id/unfollow')
  unfollowUser(
    @Req() req: Request,
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<IMsg> {
    return this.userService.unfollowUser(req.user.id, userId);
  }
}
