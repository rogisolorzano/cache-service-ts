import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { CacheService } from './cache.service';
import { SetValueDto } from './dto/set-value.dto';
import { CacheGetResponse } from './interfaces/cache-get-response.interface';

@Controller('cache')
export class CacheController {
  constructor(private cacheService: CacheService) {}

  @Get('/:key')
  async get(@Param('key') key: string): Promise<CacheGetResponse> {
    return {
      value: await this.cacheService.get(key),
    };
  }

  @Put()
  set(@Body() setValueDto: SetValueDto) {
    return this.cacheService.set(setValueDto);
  }

  @Delete('/:key')
  delete(@Param('key') key: string) {
    return this.cacheService.delete(key);
  }
}
