// token-v/token-v.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { TokenVService } from './token-v.service';
import { TokenValidationDto } from './dto/token-v.dto';

@Controller('token-validation')
export class TokenVController {
    constructor(private readonly tokenVService: TokenVService) { }

    @Post()
    async validateToken(@Body() tokenValidationDto: TokenValidationDto): Promise<boolean> {
        return this.tokenVService.validateToken(tokenValidationDto.token, tokenValidationDto.userId);
    }
}
