import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ElectionService } from './election.service';
// import { AgencyService } from './agency.service';

export interface ElectionInput {
  agencyId: number;
  date: string;
  type: string;
}

export interface ElectionOutput {
  id: number;
  date: string;
  type: string;
}

@Resolver('Election')
export class ElectionResolver {
  constructor(private electionService: ElectionService) {}

  // @Query()
  // async elections() {
  //   // return this.agencyService.agencies({});
  //   return;
  // }

  @Query()
  async election(@Args('id') id: number) {
    // return await this.electionService.election({
    //   id: id,
    // });
  }

  // @ResolveField()
  // async agency(@Parent() election) {
  //   const { id } = election;
  //   // return this.postsService.findAll({ authorId: id });
  // }

  @Mutation()
  async createElection(@Args('input') input: ElectionInput) {
    return this.electionService.createElection(input);
  }

  @Mutation()
  async createElections(@Args('input') input: ElectionInput[]) {
    return this.electionService.createElections(input);
  }

  // @Mutation()
  // async deleteAgency(@Args('id') id: number) {
  //   return this.agencyService.deleteAgency({
  //     id: id,
  //   });
  // }
}
