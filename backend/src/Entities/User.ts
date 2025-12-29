import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, type Relation } from 'typeorm';
import { Article } from './Article.js';
import { Like } from './Like.js';

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar"})
    name!: string;

    @Column({ type: "varchar", unique: true })
    email!: string;

    @Column({ type: "varchar", select: false })
    password!: string;

    @Column({
        type: "enum",
        enum: ['user', 'admin', 'editor'],
        default: "user"
    })
    role!: string;

    @OneToMany("Article", "author")
    articles!: Relation<Article>[];

    @OneToMany("Like", "user")
    likes!: Relation<Like>[];
}