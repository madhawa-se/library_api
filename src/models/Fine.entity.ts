import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Borrow } from "./Borrow.entity";

@Index("fk_fine_borrow1_idx", ["borrowId"], {})
@Entity("fine", { schema: "book_library" })
export class Fine {
  @PrimaryGeneratedColumn({ type: "int", name: "fine_id" })
  fineId: number;

  @Column("int", { name: "borrow_id" })
  borrowId: number;

  @Column("varchar", { name: "price", nullable: true, length: 45 })
  price: string | null;

  @Column("varchar", { name: "status", nullable: true, length: 45 })
  status: string | null;

  @Column("datetime", { name: "payed_date", nullable: true })
  payedDate: Date | null;

  @ManyToOne(() => Borrow, (borrow) => borrow.fines, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "borrow_id", referencedColumnName: "borrowId" }])
  borrow: Borrow;
}
