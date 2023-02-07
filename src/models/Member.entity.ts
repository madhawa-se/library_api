import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Borrow } from "./Borrow.entity";
import { User } from "./User.entity";

@Entity("member", { schema: "book_library" })
export class Member {
  @Column("int", { primary: true, name: "user_id" })
  userId: number;

  @OneToMany(() => Borrow, (borrow) => borrow.member)
  borrows: Borrow[];

  @OneToOne(() => User, (user) => user.member, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
