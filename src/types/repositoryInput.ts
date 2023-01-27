import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class RepositoryInput {
    @Field()
    method: string
    @Field()
    limit: number
}