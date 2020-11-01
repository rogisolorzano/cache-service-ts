import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [CacheModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
