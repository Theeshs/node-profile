import { Field, ObjectType } from "type-graphql"
import { PrimaryLanguage } from "./primaryLang"

@ObjectType()
export class Repository {
    @Field()
    id: string

    @Field()
    name: string

    @Field()
    description: string

    @Field()
    url: string

    @Field()
    updatedAt: string

    @Field(() => PrimaryLanguage)
    primaryLanguage: PrimaryLanguage
}