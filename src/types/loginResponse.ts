import { Field, ObjectType } from "type-graphql"

interface LoginR {
    accessToken: string
    refreshToken: string
}
@ObjectType()
export class LoginResponse implements LoginR {
    @Field()
    accessToken: string

    @Field()
    refreshToken: string
}


