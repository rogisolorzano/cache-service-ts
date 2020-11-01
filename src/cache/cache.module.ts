import { Module } from '@nestjs/common';
import { CacheController } from './cache.controller';
import { CacheService } from './cache.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [CacheController],
  providers: [CacheService],
})
export class CacheModule {}
