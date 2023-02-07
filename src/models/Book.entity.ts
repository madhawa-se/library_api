import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Auther } from "./Auther.entity";
import { Genre } from "./Genre.entity";
import { Borrow } from "./Borrow.entity";

@Index("fk_book_auther1_idx", ["autherId"], {})
@Index("fk_book_genre1_idx", ["genreId"], {})
@Entity("book", { schema: "book_library" })
export class Book {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "ISBN", nullable: true, length: 45 })
  isbn: string | null;

  @Column("varchar", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @Column("varchar", { name: "genre", nullable: true, length: 45 })
  genre: string | null;

  @Column("int", { name: "amount", nullable: true })
  amount: number | null;

  @Column("int", { name: "auther_id" })
  autherId: number;

  @Column("int", { name: "genre_id" })
  genreId: number;

  @ManyToOne(() => Auther, (auther) => auther.books, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "auther_id", referencedColumnName: "autherId" }])
  auther: Auther;

  @ManyToOne(() => Genre, (genre) => genre.books, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "genre_id", referencedColumnName: "genreId" }])
  genre_2: Genre;

  @OneToMany(() => Borrow, (borrow) => borrow.book)
  borrows: Borrow[];
}
