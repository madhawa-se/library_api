import { Test, TestingModule } from '@nestjs/testing';
import { AutherController } from './auther.controller';

describe('AutherController', () => {
  let controller: AutherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutherController],
    }).compile();

    controller = module.get<AutherController>(AutherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
