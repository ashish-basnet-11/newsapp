import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm'
import type { User } from './User.js'

@Entity("articles")
export class Article extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column("text") 
    content!: string

    @ManyToOne("User", "articles")
    author!: User;
}