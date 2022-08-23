import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Election, Prisma } from '@prisma/client';
import { ElectionInput } from 'src/graphql';

@Injectable()
export class ElectionService {
  constructor(private prisma: PrismaService) {}

  async election(
    electionWhereUniqueInput: Prisma.ElectionWhereUniqueInput,
  ): Promise<Election | null> {
    return this.prisma.election.findUnique({
      where: electionWhereUniqueInput,
    });
  }

  async createElections(data: ElectionInput[]): Promise<Election[]> {
    const elections: Election[] = [];

    for (const election of data) {
      const response = await this.createElection(election);
      elections.push(response);
    }

    return elections;
  }

  // async agencies(params: {
  //   skip?: number;
  //   take?: number;
  //   cursor?: Prisma.AgencyWhereUniqueInput;
  //   where?: Prisma.AgencyWhereInput;
  //   orderBy?: Prisma.AgencyOrderByWithRelationInput;
  // }): Promise<Agency[]> {
  //   const { skip, take, cursor, where, orderBy } = params;
  //   return this.prisma.agency.findMany({
  //     skip,
  //     take,
  //     cursor,
  //     where,
  //     orderBy,
  //   });
  // }

  async createElection(data: ElectionInput): Promise<Election> {
    const { agencyId, date, type } = data;

    const foundElection = await this.election({
      agencyId_date: { agencyId, date },
    });

    if (foundElection) return foundElection;

    const result = await this.prisma.election.create({
      data: {
        date,
        type,
        agency: {
          connect: {
            id: agencyId,
          },
        },
      },
    });

    return result;
  }

  // async deleteAgency(where: Prisma.AgencyWhereUniqueInput): Promise<Agency> {
  //   return this.prisma.agency.delete({
  //     where,
  //   });
  // }
}
