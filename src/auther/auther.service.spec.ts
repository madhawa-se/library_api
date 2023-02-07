import { Test, TestingModule } from '@nestjs/testing';
import { AutherService } from './auther.service';

describe('AutherService', () => {
  let service: AutherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutherService],
    }).compile();

    service = module.get<AutherService>(AutherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
