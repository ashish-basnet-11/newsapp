import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, Unique, type Relation } from 'typeorm';
// Use ONLY type imports here
import type { User } from './User.js';
import type { Article } from './Article.js';

@Entity("likes")
@Unique(["user", "article"])
export class Like extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    // 1. Use string name "User"
    // 2. Use Relation<> type wrapper
    @ManyToOne("User", "likes", { onDelete: "CASCADE" })
    user!: Relation<User>;

    @ManyToOne("Article", "likes", { onDelete: "CASCADE" })
    article!: Relation<Article>;
}