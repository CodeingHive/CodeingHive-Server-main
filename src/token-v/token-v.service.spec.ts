import { Test, TestingModule } from '@nestjs/testing';
import { TokenVService } from './token-v.service';

describe('TokenVService', () => {
  let service: TokenVService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenVService],
    }).compile();

    service = module.get<TokenVService>(TokenVService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
