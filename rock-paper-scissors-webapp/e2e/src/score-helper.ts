import { element, by, ElementFinder, promise, browser, until, ExpectedConditions } from "protractor";

export function verifyScore() {
  // Waiting a bit for the spinner to be displayed if it has to (depending on HttpRestInterceptor)
  browser.sleep(1500).then(() => {
    element(by.css("#loading > .spinner")).isPresent().then((isPresent) => {
      if (!isPresent) { // if the spinner is not present just check no bug and the rules
        expectNoBug();
      } else { // else wait for the request to time out if it has to
        browser.sleep(2500).then(() => {
          expectNoBug();
        });
      }
    });
  });
}

// verify if it has really timed out
function expectNoBug() {
  element(by.css("#loading > .bug")).isPresent().then((isPresent) => {
    if (isPresent) fail();
    checkRules();
  });
}

function checkRules() {
  // Player1 shape is ROCK
  playerShapeElement(1, 'rock').isPresent().then((isPresent) => {
    if(!isPresent) return;
    playerShapeElement(2, 'rock').isPresent().then((isPresent) => {
      if(!isPresent) return;
      expect(playerScoreElement(1)).toBe('0');
      expect(playerScoreElement(2)).toBe('0');
    });
    playerShapeElement(2, 'paper').isPresent().then((isPresent) => {
      if(!isPresent) return;
      expect(playerScoreElement(1)).toBe('0');
      expect(playerScoreElement(2)).toBe('1');
    });
    playerShapeElement(2, 'scissors').isPresent().then((isPresent) => {
      if(!isPresent) return;
      expect(playerScoreElement(1)).toBe('1');
      expect(playerScoreElement(2)).toBe('0');
    });
  });

  // Player1 shape is PAPER
  playerShapeElement(1, 'paper').isPresent().then((isPresent) => {
    if(!isPresent) return;
    playerShapeElement(2, 'rock').isPresent().then((isPresent) => {
      if(!isPresent) return;
      expect(playerScoreElement(1)).toBe('1');
      expect(playerScoreElement(2)).toBe('0');
    });
    playerShapeElement(2, 'paper').isPresent().then((isPresent) => {
      if(!isPresent) return;
      expect(playerScoreElement(1)).toBe('0');
      expect(playerScoreElement(2)).toBe('0');
    });
    playerShapeElement(2, 'scissors').isPresent().then((isPresent) => {
      if(!isPresent) return;
      expect(playerScoreElement(1)).toBe('0');
      expect(playerScoreElement(2)).toBe('1');
    });
  });

  // Player1 shape is SCISSORS
  playerShapeElement(1, 'scissors').isPresent().then((isPresent) => {
    if(!isPresent) return;
    playerShapeElement(2, 'rock').isPresent().then((isPresent) => {
      if(!isPresent) return;
      expect(playerScoreElement(1)).toBe('0');
      expect(playerScoreElement(2)).toBe('1');
    });
    playerShapeElement(2, 'paper').isPresent().then((isPresent) => {
      if(!isPresent) return;
      expect(playerScoreElement(1)).toBe('1');
      expect(playerScoreElement(2)).toBe('0');
    });
    playerShapeElement(2, 'scissors').isPresent().then((isPresent) => {
      if(!isPresent) return;
      expect(playerScoreElement(1)).toBe('0');
      expect(playerScoreElement(2)).toBe('0');
    });
  });
}

export function playerShapeElement(player: number, shape: string): ElementFinder {
  return element(by.css(`#player${player}-choice > fa-icon[ng-reflect-icon='fas,hand-${shape}']`));
}

function playerScoreElement(player: number): promise.Promise<string> {
  return element(by.css(`#player${player}-score > span`)).getText();
}