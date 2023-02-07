import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book/book.service';
import { BookController } from './book/book.controller';
import { Book } from './models/Book.entity';
import { Admin } from './models/Admin.entity';
import { Borrow } from './models/Borrow.entity';
import { Fine } from './models/Fine.entity';
import { Member } from './models/Member.entity';
import { User } from './models/User.entity';
import { AutherController } from './auther/auther.controller';
import { AutherService } from './auther/auther.service';
import { Auther } from './models/Auther.entity';
import { AuthService } from './services/auth/auth.service';
import { JwtStrategyService } from './services/jwt-strategy/jwt-strategy.service';
import { UserService } from './services/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './services/category/category.service';
import { Genre } from './models/Genre.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: "default",
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "book_library",
      synchronize: false,
      entities: ["dist/**/*.entity.js"]
    }),
    TypeOrmModule.forFeature([Book, User, Admin, Fine, Borrow, Member, Auther,Genre]),
    JwtModule.register({
      secret: "Secret",
      signOptions: { expiresIn: '60000000s' },
    })
  ],
  controllers: [AppController, BookController, AutherController,AuthController, CategoryController],
  providers: [AppService, BookService, AutherService, AuthService, JwtStrategyService, UserService, CategoryService],
})
export class AppModule {


}
