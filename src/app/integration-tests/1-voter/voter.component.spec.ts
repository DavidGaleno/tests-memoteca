import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VoterComponent } from './voter.component';

describe(VoterComponent.name, () => {
  let fixture: ComponentFixture<VoterComponent>;
  let component: VoterComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoterComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(VoterComponent);
    component = fixture.componentInstance;
  });
  it('should render totalVotes', () => {
    fixture.detectChanges();
    const span: HTMLSpanElement =
      fixture.nativeElement.querySelector('.vote-count');
    expect(span.innerText).toContain(component.totalVotes.toString());
  });
  it(`should have highlighted class when (@Input myVote) is 1`, () => {
    component.myVote = 1;
    fixture.detectChanges();
    const element: HTMLElement =
      fixture.nativeElement.querySelector('.glyphicon');
    console.log(element);
    expect(element.classList).toContain('highlighted');
  });
  it(`should increase totalVotes when i click the upvote button`, () => {
    component.myVote = 0;
    fixture.detectChanges();
    const element: HTMLElement =
      fixture.nativeElement.querySelector('.glyphicon');
    element.click();
    expect(component.totalVotes).toBe(1);
    const span: HTMLSpanElement =
      fixture.nativeElement.querySelector('.vote-count');
    fixture.detectChanges();
    expect(span.innerText).toContain(component.totalVotes.toString());
  });
});
