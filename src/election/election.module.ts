import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ElectionResolver } from './election.resolver';
import { ElectionService } from './election.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, ElectionResolver, ElectionService],
  exports: [],
})
export class ElectionModule {}
