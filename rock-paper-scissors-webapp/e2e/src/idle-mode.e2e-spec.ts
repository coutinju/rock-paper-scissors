import { browser, by, element, logging, ElementFinder, promise, ExpectedConditions } from 'protractor';

import { AppPage } from './app.po';
import { verifyScore, playerShapeElement } from './score-helper';

describe('Idle Mode', () => {
  let page: AppPage;
  const tries = 10;

  beforeEach(async() => {
    page = new AppPage();
    page.navigateTo();
  });

  /* 
   * Tests are realised as a user would (no mock involved, to really test end-to-end)
   * So tests are repeated to try to cover randomly multiple cases (10 times may not be enough)
   */
  for (var i = 0; i < tries; i++) {
    it('should change the score periodically when IDLE mode is activated', async () => {
      // Timeout is restarted continuously (cannot wait for it)
      browser.ignoreSynchronization = true;
      element(by.css("#idle > fa-stack > fa-icon.gamepad")).click().then(() => {
        verifyScore();
      });
    });
  }

	afterAll(async () => {
		// Assert that there are no errors emitted from the browser
		const logs = await browser.manage().logs().get(logging.Type.BROWSER);
		expect(logs).not.toContain(jasmine.objectContaining({
			level: logging.Level.SEVERE,
		} as logging.Entry));
  });
});