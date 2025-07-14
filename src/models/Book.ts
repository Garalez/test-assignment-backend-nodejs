import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  isbn!: string;

  @Column()
  author!: string;

  @Column('date')
  releaseDate!: Date;
} 
