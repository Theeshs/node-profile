import { MyContext } from "../interfaces/myContext";
import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET_KEY } from "../config/tokenConfigs";
import DB from "../db/data-source";
import { Account } from "../db/entities/user";

const accountRepo = DB.getRepository(Account)

export const isAuthorized: MiddlewareFn<MyContext> = ({ context }, next) => {
    const authorization = context.req.headers.authorization
    console.log(authorization)
    if (!authorization) {
        throw new Error("Permission denied")
    }

    try {
        const tokenSplit = authorization.split(" ")
        console.log(tokenSplit)
        if (tokenSplit[0] !== "Bearer") {
            throw new Error("Permission Denied")
        }
        const privateKey = Buffer.from(ACCESS_TOKEN_SECRET_KEY,
            'base64'
        ).toString('ascii');
        const payload = verify(tokenSplit[1], privateKey)
        console.log("payload here")
        console.log(payload)
        context.payload = payload as any
    } catch (err) {
        console.log("Error", err)
        throw new Error("User not authenticated")
    }

    return next();
}