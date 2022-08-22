import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AgencyResolver } from './agency.resolver';
import { AgencyService } from './agency.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, AgencyResolver, AgencyService],
  exports: [],
})
export class AgencyModule {}
