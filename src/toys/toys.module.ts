import { Module } from '@nestjs/common';
import { ToysService } from './toys.service';
import { ToysController } from './toys.controller';

@Module({
  controllers: [ToysController],
  providers: [ToysService],
})
export class ToysModule {}
