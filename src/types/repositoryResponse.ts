import { Field, ObjectType } from "type-graphql";
import { Repository } from "./nodes";


@ObjectType()
export class RepositoryResponse {
    @Field()
    login: string

    @Field()
    name: string

    @Field(() => [Repository])
    reposiories: Repository[]

}