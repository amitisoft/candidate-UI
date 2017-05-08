import { CandidateUIPage } from './app.po';

describe('candidate-ui App', () => {
  let page: CandidateUIPage;

  beforeEach(() => {
    page = new CandidateUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('cui works!');
  });
});
