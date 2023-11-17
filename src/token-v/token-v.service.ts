// token-v/token-v.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TokenVService {
    constructor(private readonly prisma: PrismaService) { }

    async validateToken(token: string, userId: string): Promise<boolean> {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: parseInt(userId, 10),
                    token: token,
                },
            });

            return !!user;
        } catch (error) {
            return false;
        }
    }
}
