import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from './cache/cache.module';
import configuration from './config/configuration';

@Module({
  imports: [CacheModule, ConfigModule.forRoot({
    load: [configuration],
  })],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
