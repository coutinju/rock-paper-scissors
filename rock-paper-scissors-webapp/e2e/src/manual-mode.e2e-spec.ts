import { browser, by, element, logging, ElementFinder, promise, until } from 'protractor';

import { AppPage } from './app.po';
import { verifyScore } from './score-helper';

describe('Manual Mode', () => {
  let page: AppPage;
  const tries = 10;

	beforeEach(async () => {
    page = new AppPage();
    page.navigateTo();
  });

  /* 
   * Tests are realised as a user would (no mock involved, to really test end-to-end)
   * So tests are repeated to try to cover randomly multiple cases (10 times may not be enough)
   */
  for (var i = 0; i < tries; i++) {
    it('should change the score when the user selects PAPER', async () => {
      await element(by.css("#shapes-svg-g-PAPER")).click().then(() => {
        verifyScore();
      });
    });

    it('should change the score when the user selects ROCK', async () => {
      await element(by.css("#shapes-svg-g-ROCK")).click().then(() => {
        verifyScore();
      });
    });

    it('should change the score when the user selects SCISSORS', async () => {
      await element(by.css("#shapes-svg-g-SCISSORS")).click().then(() => {
        verifyScore();
      });
    });
  }

	afterEach(async () => {
		// Assert that there are no errors emitted from the browser
		const logs = await browser.manage().logs().get(logging.Type.BROWSER);
		expect(logs).not.toContain(jasmine.objectContaining({
			level: logging.Level.SEVERE,
		} as logging.Entry));
  });
});