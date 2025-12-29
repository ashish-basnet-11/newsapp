import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User.js';
import { Like } from './Like.js';

@Entity("articles")
export class Article extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar"})
    title!: string;

    @Column({type: "text"})
    content!: string;

    @ManyToOne(() => User, (user) => user.articles)
    author!: User;

    @OneToMany("Like", "article") // Use string "Article"
    likes!: Like[];
}