import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MembersService {

    constructor(@InjectRepository(User)
    private userRepository: Repository<User>){

    }
        async search(name: string): Promise<User[]> {
            if (name) {
                return await this.userRepository
                    .createQueryBuilder('user')
                    .where('user.email = :name OR user.email LIKE :like', {
                        name: name,
                        like: `%${name}%`,
                    })
                    .getMany();
    
            }
            return [];
        }
}
