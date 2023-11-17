import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    generateRandomToken(): string {

        const randomString = Math.random().toString(36).substring(2);

        const timestamp = Date.now();

        return `${randomString}${timestamp}`;
    }


    async signup(dto: AuthDto) {
        try {

            const sameUserName = await this.prisma.user.findUnique({
                where: {
                    username: dto.username,
                },
            });

            if (sameUserName) {
                throw new ForbiddenException('Username Already taken found');
            }

            if (dto.password.length < 8) {
                throw new ForbiddenException('Password must be at least 8 characters');
            }

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

            if (!passwordRegex.test(dto.password)) {
                throw new ForbiddenException('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character');
            }

            if (dto.username.length < 0 || dto.username.length < 0) {
                throw new ForbiddenException('Username, fullname must be at least 1 characters');
            }

            const token = this.generateRandomToken();

            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash: dto.password,
                    fullname: dto.fullname,
                    username: dto.username,
                    token: token,
                },
            });

            delete user.hash;

            return user;

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Email already exists');
                }
            }

            throw error;
        }
    }

    async signin(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (!user) {
            throw new ForbiddenException('No user with email found');
        }

        const isPasswordValid = user.hash === dto.password;

        if (!isPasswordValid) {
            throw new ForbiddenException('Invalid password');
        }

        delete user.hash;
        return user;
    }
}
