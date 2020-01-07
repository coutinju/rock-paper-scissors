package com.jcou.rockpaperscissors.game.domain;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ShapeTest {

  @Test
  void testRandom_() {
  }

  // TESTS BEATS
  @Test
  void testBeats_givenShapeRockWhenShapeIsPaperShouldReturnTrue() {
    assertTrue(Shape.PAPER.beats(Shape.ROCK));
  }

  @Test
  void testBeats_givenShapePaperWhenShapeIsPaperShouldReturnFalse() {
    assertFalse(Shape.PAPER.beats(Shape.PAPER));
  }

  @Test
  void testBeats_givenShapeScissorsWhenShapeIsPaperShouldReturnFalse() {
    assertFalse(Shape.PAPER.beats(Shape.SCISSORS));
  }

  @Test
  void testBeats_givenShapeRockWhenShapeIsRockShouldReturnFalse() {
    assertFalse(Shape.ROCK.beats(Shape.ROCK));
  }

  @Test
  void testBeats_givenShapePaperWhenShapeIsRockShouldReturnFalse() {
    assertFalse(Shape.ROCK.beats(Shape.PAPER));
  }

  @Test
  void testBeats_givenShapeScissorsWhenShapeIsRockShouldReturnTrue() {
    assertTrue(Shape.ROCK.beats(Shape.SCISSORS));
  }

  @Test
  void testBeats_givenShapeRockWhenShapeIsScissorsShouldReturnFalse() {
    assertFalse(Shape.SCISSORS.beats(Shape.ROCK));
  }

  @Test
  void testBeats_givenShapePaperWhenShapeIsScissorsShouldReturnTrue() {
    assertTrue(Shape.SCISSORS.beats(Shape.PAPER));
  }

  @Test
  void testBeats_givenShapeScissorsWhenShapeIsScissorsShouldReturnFalse() {
    assertFalse(Shape.SCISSORS.beats(Shape.SCISSORS));
  }

  // TESTS ISBEATENBY
  @Test
  void testIsBeatenBy_givenShapeRockWhenShapeIsPaperShouldReturnFalse() {
    assertFalse(Shape.PAPER.isBeatenBy(Shape.ROCK));
  }

  @Test
  void testIsBeatenBy_givenShapePaperWhenShapeIsPaperShouldReturnFalse() {
    assertFalse(Shape.PAPER.isBeatenBy(Shape.PAPER));
  }

  @Test
  void testIsBeatenBy_givenShapeScissorsWhenShapeIsPaperShouldReturnTrue() {
    assertTrue(Shape.PAPER.isBeatenBy(Shape.SCISSORS));
  }

  @Test
  void testIsBeatenBy_givenShapeRockWhenShapeIsRockShouldReturnFalse() {
    assertFalse(Shape.ROCK.isBeatenBy(Shape.ROCK));
  }

  @Test
  void testIsBeatenBy_givenShapePaperWhenShapeIsRockShouldReturnTrue() {
    assertTrue(Shape.ROCK.isBeatenBy(Shape.PAPER));
  }

  @Test
  void testIsBeatenBy_givenShapeScissorsWhenShapeIsRockShouldReturnFalse() {
    assertFalse(Shape.ROCK.isBeatenBy(Shape.SCISSORS));
  }

  @Test
  void testIsBeatenBy_givenShapeRockWhenShapeIsScissorsShouldReturnTrue() {
    assertTrue(Shape.SCISSORS.isBeatenBy(Shape.ROCK));
  }

  @Test
  void testIsBeatenBy_givenShapePaperWhenShapeIsScissorsShouldReturnFalse() {
    assertFalse(Shape.SCISSORS.isBeatenBy(Shape.PAPER));
  }

  @Test
  void testIsBeatenBy_givenShapeScissorsWhenShapeIsScissorsShouldReturnFalse() {
    assertFalse(Shape.SCISSORS.isBeatenBy(Shape.SCISSORS));
  }

  // TESTS CLASH
  @Test
  void testClash_givenShapesRockAndScissorsShouldReturnWinnerPlayer1() {
    assertEquals(Shape.clash(Shape.ROCK, Shape.SCISSORS), Winner.PLAYER1);
  }

  @Test
  void testClash_givenShapesRockAndPaperShouldReturnWinnerPlayer2() {
    assertEquals(Shape.clash(Shape.ROCK, Shape.PAPER), Winner.PLAYER2);
  }

  @Test
  void testClash_givenShapesPaperAndPaperShouldReturnWinnerDraw() {
    assertEquals(Shape.clash(Shape.PAPER, Shape.PAPER), Winner.DRAW);
  }
}