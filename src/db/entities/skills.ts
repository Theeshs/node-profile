import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Skills {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({ nullable: false, length: 100 })
    name: string
}