import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TokenVModule } from './token-v/token-v.module';

@Module({
  imports: [AuthModule, PrismaModule, TokenVModule],
})
export class AppModule { }
