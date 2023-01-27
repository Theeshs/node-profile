import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user_skills', })
@ObjectType()
export class UserSkills {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    skillRate: number
}