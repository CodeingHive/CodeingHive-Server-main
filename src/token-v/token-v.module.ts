// token-v/token-v.module.ts
import { Module } from '@nestjs/common';
import { TokenVController } from './token-v.controller';
import { TokenVService } from './token-v.service';

@Module({
  controllers: [TokenVController],
  providers: [TokenVService],
  exports: [TokenVService],
})
export class TokenVModule { }
