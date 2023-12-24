import { VoteEventEmitterComponent } from './vote-event-emitter.component';

describe(VoteEventEmitterComponent.name, () => {
  let component: VoteEventEmitterComponent;

  beforeEach(() => {
    component = new VoteEventEmitterComponent();
  });

  it(`(@Output voteChanged) should emit when #${VoteEventEmitterComponent.prototype.upVote.name} is called`, () => {
    const voteChangedSpy = spyOn(component.voteChanged, 'emit');
    component.upVote();
    expect(voteChangedSpy).toHaveBeenCalled();
  });
});
