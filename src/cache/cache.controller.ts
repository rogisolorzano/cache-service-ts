import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { CacheService } from './cache.service';
import { SetValueDto } from './dto/set-value.dto';

@Controller('cache')
export class CacheController {
  constructor(private cacheService: CacheService) {}

  @Get('/:key')
  get(@Param('key') key: string): Promise<string> {
    return this.cacheService.get(key);
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
