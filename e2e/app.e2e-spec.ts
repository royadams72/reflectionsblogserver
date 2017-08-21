import { ReflectionsBlogPage } from './app.po';

describe('reflections-blog App', () => {
  let page: ReflectionsBlogPage;

  beforeEach(() => {
    page = new ReflectionsBlogPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
