import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PrimaryLanguage {
    @Field()
    name: string
}