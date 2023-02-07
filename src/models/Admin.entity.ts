import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { User } from "./User.entity";

@Entity("admin", { schema: "book_library" })
export class Admin {
  @Column("int", { primary: true, name: "user_id" })
  userId: number;

  @OneToOne(() => User, (user) => user.admin, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  xuserId: User;
}
