// token-v/dto/token-v.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class TokenValidationDto {
    @IsString()
    @IsNotEmpty()
    token: string;

    @IsString()
    @IsNotEmpty()
    userId: string;
}
