import { Account } from "../db/entities/user";
import { Field, InputType } from "type-graphql";

interface Login {
    email: string,
    password: string
}

@InputType()
export class LoginInput implements Partial<Login> {
    @Field()
    email?: string;

    @Field()
    password?: string;
}