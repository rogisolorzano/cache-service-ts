import { Injectable } from '@nestjs/common';
import { SetValueDto } from './dto/set-value.dto';

@Injectable()
export class CacheService {
  async get(key: string): Promise<string> {
    // TODO
    return "";
  }

  async set(setValueDto: SetValueDto) {
    // TODO
  }

  async delete(key: string) {
    // TODO
  }
}
