import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AgencyService } from './agency.service';

export interface AgencyInput {
  name: string;
  software: string;
  url: string;
}

export interface AgencyOutput {
  id: number;
  name: string;
  software: string;
  url: string;
}

@Resolver('Agency')
export class AgencyResolver {
  constructor(private agencyService: AgencyService) {}

  @Query()
  async agencies() {
    return this.agencyService.agencies({});
  }

  @Query()
  async agency(@Args('id') id: number) {
    return await this.agencyService.agency({
      id: id,
    });
  }

  @Mutation()
  async createAgency(@Args('input') input: AgencyInput) {
    const { name, software, url } = input;

    return this.agencyService.createAgency({
      name,
      software,
      url,
    });
  }

  @Mutation()
  async deleteAgency(@Args('id') id: number) {
    return this.agencyService.deleteAgency({
      id: id,
    });
  }
}
