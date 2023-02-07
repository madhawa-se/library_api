import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book.entity";

@Entity("auther", { schema: "book_library" })
export class Auther {
  @PrimaryGeneratedColumn({ type: "int", name: "auther_id" })
  autherId: number;

  @Column("varchar", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @OneToMany(() => Book, (book) => book.auther)
  books: Book[];
}
