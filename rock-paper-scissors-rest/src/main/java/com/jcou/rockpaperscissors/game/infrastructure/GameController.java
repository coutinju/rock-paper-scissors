package com.jcou.rockpaperscissors.game.infrastructure;

import com.jcou.rockpaperscissors.game.domain.Shape;
import com.jcou.rockpaperscissors.game.domain.Winner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/rest/game")
public class GameController {
  @PostMapping(path = "/result")
  public Result manualResult(@RequestBody Request request) {
    Shape player1ShapeSelected = request.getPlayer1ShapeSelected();
    Shape player2ShapeGenerated = Shape.random();
    Winner winner = Shape.clash(player1ShapeSelected, player2ShapeGenerated);
    return new Result(player1ShapeSelected, player2ShapeGenerated, winner);
  }

  @GetMapping(path = "/result")
  public Result idleResult() {
    Shape player1ShapeGenerated = Shape.random();
    Shape player2ShapeGenerated = Shape.random();
    Winner winner = Shape.clash(player1ShapeGenerated, player2ShapeGenerated);
    return new Result(player1ShapeGenerated, player2ShapeGenerated, winner);
  }

  @ExceptionHandler(RuntimeException.class)
  public final ResponseEntity<Exception> handleAllExceptions(RuntimeException ex) {
    return new ResponseEntity<>(ex, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
