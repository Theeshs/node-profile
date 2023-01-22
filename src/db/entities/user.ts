import { Field, ObjectType } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Account {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({
        nullable: true,
        length: 50
    })
    firstName: string

    @Field()
    @Column({
        nullable: true,
        length: 50
    })
    lastName: string

    @Field()
    @Column({
        nullable: false,
        unique: true,
        length: 50
    })
    userName: string

    @Field()
    @Column({
        nullable: false,
        unique: true,
        length: 50
    })
    email: string

    @Field()
    @Column({
        nullable: false,
        length: 250
    })
    password: string

    @Field()
    @Column({
        nullable: true
    })
    dateOfBirth: Date

    @Field()
    @Column({
        nullable: true,
        length: 50
    })
    image: string

    @Field()
    @Column({
        nullable: true,
        length: 250
    })
    linkedIn: string

    @Field()
    @Column({
        nullable: true,
        length: 250
    })
    faceBook: string

    @Field()
    @Column({
        nullable: true,
        length: 250
    })
    gitHub: string

    @Field()
    @Column({
        nullable: false,
        length: 250
    })
    stackOverFlow: string
}
