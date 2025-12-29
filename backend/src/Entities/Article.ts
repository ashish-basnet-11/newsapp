import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, type Relation } from 'typeorm';
import { User } from './User.js';
import { Like } from './Like.js';

@Entity("articles")
export class Article extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar" })
    title!: string;

    @Column({ type: "text" })
    content!: string;

    @ManyToOne(() => User, (user) => user.articles)
    author!: User;

    @OneToMany("Like", "article")
    likes!: Like[];

    // Add this property inside the Article class
    @OneToMany("Comment", "article")
    comments!: Relation<Comment>[];
}