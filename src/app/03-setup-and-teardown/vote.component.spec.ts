import { VoteComponent } from './vote.component';

describe(VoteComponent.name, () => {
  let voteComponent: VoteComponent
  beforeEach(() => {
    voteComponent = new VoteComponent();
  });
  it(`#${VoteComponent.prototype.upVote.name} should increment totalVotes`, () => {
    const originalTotalVotes = voteComponent.totalVotes;
    voteComponent.upVote();

    expect(voteComponent.totalVotes).toBeGreaterThan(originalTotalVotes);
  });
  it(`#${VoteComponent.prototype.downVote.name} should decrement totalVotes`, () => {
    const originalTotalVotes = voteComponent.totalVotes;
    voteComponent.downVote();
    expect(voteComponent.totalVotes).toBeLessThan(originalTotalVotes);
  });
});
