
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";

import { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_EXP, REFRESH_TOKEN_SECRET_KEY } from "../config/tokenConfigs";
import { ACCESS_TOKEN_EXP } from "../config/tokenConfigs";
import { isAuthorized } from "../utils/authChecker";
import DB from "../db/data-source";
import { Account } from "../db/entities/user";
import { AccountInput } from "../types/UserInput";
import { LoginInput } from "../types/loginInput"
import { LoginResponse } from "../types/loginResponse";
import { hashPassword, checkPasswordHash } from "../utils/hash";
import { singJWT } from "../utils/jwt";
import { MyContext } from "../interfaces/myContext";

const accountRepository = DB.getRepository(Account)


@Resolver(of => Account)
export class UserResolver {
    @Query((_returns) => Account, { nullable: false })
    async returnSingleUser(@Arg('id') id: number) {
        return await accountRepository.findOneBy({
            id
        })
    }

    @Mutation((_of) => Account)
    async createAccount(@Arg("data") {
        firstName, lastName, userName, email, password, dateOfBirth, image,
        linkedIn, faceBook, gitHub, stackOverFlow
    }: AccountInput): Promise<Account> {
        // hasing the password
        const pasowrdHash = await hashPassword(password)


        // saving the user
        const account = new Account()
        account.firstName = firstName
        account.lastName = lastName
        account.userName = userName
        account.email = email
        account.password = pasowrdHash
        account.dateOfBirth = dateOfBirth
        account.image = image
        account.linkedIn = linkedIn
        account.faceBook = faceBook
        account.gitHub = gitHub
        account.stackOverFlow = stackOverFlow
        return accountRepository.save(account)
    }

    @Mutation(returns => LoginResponse)
    async loginUser(@Arg("data") loginInput: LoginInput): Promise<LoginResponse> {
        const user = await accountRepository.findOneBy({ email: loginInput.email })

        if (!user) {
            throw new Error("Invalid credentials")
        }

        if (!await checkPasswordHash(loginInput.password, user.password)) {
            throw new Error("Invalid credentials")
        }
        const accessToken = await singJWT({ email: user.email }, ACCESS_TOKEN_SECRET_KEY, ACCESS_TOKEN_EXP)
        const refreshToken = await singJWT({ email: user.email }, REFRESH_TOKEN_SECRET_KEY, REFRESH_TOKEN_EXP)
        return {
            "accessToken": accessToken,
            "refreshToken": refreshToken
        }
    }

    @Query(() => Account)
    @UseMiddleware(isAuthorized)
    async Me(@Ctx() { payload }: MyContext) {
        return await accountRepository.findOneBy({
            email: payload.email
        })
    }
}