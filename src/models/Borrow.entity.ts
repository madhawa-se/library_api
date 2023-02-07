import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./Book.entity";
import { Member } from "./Member.entity";
import { Fine } from "./Fine.entity";

@Index("borrow_id_UNIQUE", ["borrowId"], { unique: true })
@Index("fk_member_has_book_book1_idx", ["bookId"], {})
@Index("fk_member_has_book_member1_idx", ["memberId"], {})
@Entity("borrow", { schema: "book_library" })
export class Borrow {
  @PrimaryGeneratedColumn({ type: "int", name: "borrow_id" })
  borrowId: number;

  @Column("int", { name: "member_id" })
  memberId: number;

  @Column("int", { name: "book_id" })
  bookId: number;

  @Column("varchar", { name: "date", nullable: true, length: 45 })
  date: string | null;

  @Column("varchar", { name: "status", nullable: true, length: 45 })
  status: string | null;

  @ManyToOne(() => Book, (book) => book.borrows, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "book_id", referencedColumnName: "id" }])
  book: Book;

  @ManyToOne(() => Member, (member) => member.borrows, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "member_id", referencedColumnName: "userId" }])
  member: Member;

  @OneToMany(() => Fine, (fine) => fine.borrow)
  fines: Fine[];
}
