import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm'
import type { Article } from './Article.js';

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ select: false }) 
    password!: string;

    @Column({
        type: "enum",
        enum: ['user', 'admin', 'editor'],
        default: "user"
    })
    role!: string;

    @OneToMany("Article", "author")
    articles!: Article[]
}