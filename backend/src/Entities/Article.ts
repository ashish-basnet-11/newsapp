import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, type Relation, CreateDateColumn, UpdateDateColumn } from 'typeorm';
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

    @Column({ type: "varchar", nullable: true }) 
    imageUrl?: string | null; 

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne(() => User, (user) => user.articles)
    author!: User;

    @OneToMany("Like", "article")
    likes!: Like[];

    @OneToMany("Comment", "article")
    comments!: Relation<Comment>[];
}