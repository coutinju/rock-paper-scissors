package com.jcou.rockpaperscissors.game.infrastructure;

import com.jcou.rockpaperscissors.game.domain.Shape;

import java.io.Serializable;

public class Request implements Serializable {
  private static final long serialVersionUID = 5873323795698370890L;

  private Shape player1ShapeSelected;

  public Request(Shape player1ShapeSelected) {
    this.player1ShapeSelected = player1ShapeSelected;
  }

  // Empty constructor for deserialization (Jackson)
  public Request() {}

  public Shape getPlayer1ShapeSelected() {
    return player1ShapeSelected;
  }

  public void setPlayer1ShapeSelected(Shape player1ShapeSelected) {
    this.player1ShapeSelected = player1ShapeSelected;
  }
}
