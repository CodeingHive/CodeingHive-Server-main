import { ForbiddenException, Injectable, Req } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signup(dto: AuthDto) {
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash: dto.password,
                },
            })

            delete user.hash
            // return the saved user
            return user
        } catch (error) {

            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Email already exists')
                }
            }

            throw error
        }
    }


    async signin(dto: AuthDto) {

        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        })

        if (!user) {
            throw new ForbiddenException('No User with Email found')
        }

        const isPasswordValid = user.hash === dto.password

        if (!isPasswordValid) {
            throw new ForbiddenException('Invalid Password')
        }

        delete user.hash
        return user
    }
}