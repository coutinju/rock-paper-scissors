package com.jcou.rockpaperscissors.game.domain;

import java.util.*;

public enum Shape {
  ROCK,
  PAPER,
  SCISSORS;

  private Set<Shape> beatsSet = new HashSet<>();
  private Set<Shape> beatenBySet = new HashSet<>();

  static {
    ROCK.beatsSet.add(SCISSORS);
    PAPER.beatsSet.add(ROCK);
    SCISSORS.beatsSet.add(PAPER);

    ROCK.beatenBySet.add(PAPER);
    PAPER.beatenBySet.add(SCISSORS);
    SCISSORS.beatenBySet.add(ROCK);
  }

  private static final Random RANDOM_GENERATOR = new Random(System.nanoTime());
  private static final List<Shape> VALUES_LIST = Arrays.asList(values());
  private static final int VALUES_LIST_SIZE = VALUES_LIST.size();

  public static Shape random() {
    return VALUES_LIST.get(RANDOM_GENERATOR.nextInt(VALUES_LIST_SIZE));
  }

  public boolean beats(Shape shape) {
    return this.beatsSet.contains(shape);
  }

  public boolean isBeatenBy(Shape shape) {
    return this.beatenBySet.contains(shape);
  }

  public static Winner clash(Shape player1Shape, Shape player2Shape) {
    if (player1Shape == null || player2Shape == null) {
      // TODO: make custom exception and message
      throw new RuntimeException();
    }

    if (player1Shape.beats(player2Shape)) {
      return Winner.PLAYER1;
    } else if (player1Shape.isBeatenBy(player2Shape)) {
      return Winner.PLAYER2;
    } else {
      return Winner.DRAW;
    }
  }
}
