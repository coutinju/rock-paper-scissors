package com.jcou.rockpaperscissors.game.infrastructure;

import com.jcou.rockpaperscissors.game.domain.Shape;
import com.jcou.rockpaperscissors.game.domain.Winner;

import java.io.Serializable;

public class Result implements Serializable {
  private static final long serialVersionUID = 3204259657468451101L;

  private Shape player1Shape;
  private Shape player2Shape;
  private Winner winner;

  public Result(Shape player1Shape, Shape player2Shape, Winner winner) {
    this.player1Shape = player1Shape;
    this.player2Shape = player2Shape;
    this.winner = winner;
  }

  public Shape getPlayer1Shape() {
    return player1Shape;
  }

  public void setPlayer1Shape(Shape player1Shape) {
    this.player1Shape = player1Shape;
  }

  public Shape getPlayer2Shape() {
    return player2Shape;
  }

  public void setPlayer2Shape(Shape player2Shape) {
    this.player2Shape = player2Shape;
  }

  public Winner getWinner() {
    return winner;
  }

  public void setWinner(Winner winner) {
    this.winner = winner;
  }
}
