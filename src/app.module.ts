import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToysModule } from './toys/toys.module';
import { ChildrenModule } from './children/children.module';

@Module({
  imports: [ToysModule, ChildrenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
