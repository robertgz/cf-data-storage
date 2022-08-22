import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Agency, Prisma } from '@prisma/client';

@Injectable()
export class AgencyService {
  constructor(private prisma: PrismaService) {}

  async agency(
    agencyWhereUniqueInput: Prisma.AgencyWhereUniqueInput,
  ): Promise<Agency | null> {
    return this.prisma.agency.findUnique({
      where: agencyWhereUniqueInput,
    });
  }

  async agencies(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AgencyWhereUniqueInput;
    where?: Prisma.AgencyWhereInput;
    orderBy?: Prisma.AgencyOrderByWithRelationInput;
  }): Promise<Agency[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.agency.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createAgency(data: Prisma.AgencyCreateInput): Promise<Agency> {
    const { url } = data;

    const foundAgency = await this.agency({
      url,
    });

    if (foundAgency) return foundAgency;

    return this.prisma.agency.create({
      data,
    });
  }

  async deleteAgency(where: Prisma.AgencyWhereUniqueInput): Promise<Agency> {
    return this.prisma.agency.delete({
      where,
    });
  }
}
