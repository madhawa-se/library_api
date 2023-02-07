import { BeforeInsert, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Admin } from "./Admin.entity";
import { Member } from "./Member.entity";
import * as bcrypt from 'bcrypt';

@Entity("user", { schema: "book_library" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id" })
  userId: number;

  @Column("varchar", { name: "password", nullable: true, length: 100 })
  password: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 100 })
  email: string | null;

  @Column("varchar", { name: "firstName", nullable: true, length: 45 })
  firstName: string | null;

  @Column("varchar", { name: "lastName", nullable: true, length: 45 })
  lastName: string | null;

  @Column("datetime", { name: "reg_date", nullable: true })
  regDate: Date | null;

  @OneToOne(() => Admin, (admin) => admin.userId)
  admin: Admin;

  @OneToOne(() => Member, (member) => member.user)
  member: Member;

  @BeforeInsert() async hashPassword() {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const encryptedPassword = await bcrypt.hash(this.password, salt);
    this.password = encryptedPassword;
  }

  comparePassword(attempt: string): Promise<boolean> {
    console.log("compare ", attempt, this.password , bcrypt.compare(attempt, this.password));
    return bcrypt.compare(attempt, this.password);
  }
}
