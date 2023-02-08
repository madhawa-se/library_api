import {
  AfterLoad,
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
import { User } from "./User.entity";

@Index("borrow_id_UNIQUE", ["borrowId"], { unique: true })
@Index("fk_member_has_book_book1_idx", ["bookId"], {})
@Index("fk_borrow_user1_idx", ["memberId"], {})
@Entity("borrow", { schema: "book_library" })
export class Borrow {

  dueDate: Date | null;
  costPerDay = 10;
  cost = 0;

  @PrimaryGeneratedColumn({ type: "int", name: "borrow_id" })
  borrowId: number;

  @Column("int", { name: "member_id" })
  memberId: number;

  @Column("int", { name: "book_id" })
  bookId: number;

  @Column("date", { name: "date", nullable: true })
  date: Date | null;


  @Column("varchar", { name: "status", nullable: true, length: 45 })
  status: string | null;

  @ManyToOne(() => User, (user) => user.borrows, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "member_id", referencedColumnName: "userId" }])
  member: User;

  @ManyToOne(() => Book, (book) => book.borrows, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "book_id", referencedColumnName: "id" }])
  book: Book;

  @OneToMany(() => Fine, (fine) => fine.borrow)
  fines: Fine[];

  @AfterLoad()
  updateDueDate() {
    this.dueDate = new Date(new Date(this.date).getTime() + 1000 * 60 * 60 * 24 * 14);
    //calculate fine 

    const due = new Date(this.dueDate);
    const today = new Date();
    const differenceInMilliseconds = today.getTime() - due.getTime();
    const differenceInDays = Math.round(differenceInMilliseconds / 1000 / 60 / 60 / 24);
    this.cost = differenceInDays > 0 ? differenceInDays * this.costPerDay : 0;
  }
}
