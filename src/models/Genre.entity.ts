import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book.entity";

@Entity("genre", { schema: "book_library" })
export class Genre {
  @PrimaryGeneratedColumn({ type: "int", name: "genre_id" })
  genreId: number;

  @Column("varchar", { name: "name", nullable: true, length: 45 })
  name: string | null;

  @OneToMany(() => Book, (book) => book.genre_2)
  books: Book[];
}
