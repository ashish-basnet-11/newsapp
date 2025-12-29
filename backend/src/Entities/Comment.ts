import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn, type Relation } from 'typeorm';
import type { User } from './User.js';
import type { Article } from './Article.js';

@Entity("comments")
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "text" })
    message!: string; // The actual comment text

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne("User", "comments", { onDelete: "CASCADE" })
    user!: Relation<User>;

    @ManyToOne("Article", "comments", { onDelete: "CASCADE" })
    article!: Relation<Article>;
}