import { Field, InputType } from "type-graphql";
import { Account } from "../db/entities/user"

@InputType()
export class AccountInput implements Partial<Account> {
    @Field()
    firstName?: string
    @Field()
    lastName?: string
    @Field()
    userName: string
    @Field()
    email: string
    @Field()
    password: string
    @Field()
    dateOfBirth?: Date
    @Field()
    image?: string
    @Field()
    linkedIn?: string
    @Field()
    faceBook?: string
    @Field()
    gitHub?: string
    @Field()
    stackOverFlow?: string
}