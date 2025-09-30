import { Test, TestingModule } from '@nestjs/testing';
import { AvatarsController } from './modules/avatars/avatarsController';
import { AvatarsService } from './modules/avatars/avatars.service';

describe('AvatarController', () => {
  let appController: AvatarsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AvatarsController],
      providers: [AvatarsService],
    }).compile();

    appController = app.get<AvatarsController>(AvatarsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
