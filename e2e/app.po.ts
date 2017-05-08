import { browser, element, by } from 'protractor';

export class CandidateUIPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('cui-root h1')).getText();
  }
}
