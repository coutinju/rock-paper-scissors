package com.jcou.rockpaperscissors.game.infrastructure;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jcou.rockpaperscissors.game.domain.Shape;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.RepeatedTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
@WebMvcTest
class GameControllerTest {

    @InjectMocks
    GameController gameController;

    @Autowired
    private WebApplicationContext wac;

    private MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
    }

    @Test
    public void testManualResult_shouldReturnOkStatus() throws Exception {
        Request request = new Request(Shape.random());
        mockMvc.perform(get("/rest/game/result")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk());
    }

    @RepeatedTest(10)
    public void testManualResult_shouldReturnAValidResultWhenScissorsSelected() {
        Request request = new Request(Shape.SCISSORS);
        Result result = gameController.manualResult(request);

        verifyResult(result);
    }

    @RepeatedTest(10)
    public void testManualResult_shouldReturnAValidResultWhenRockSelected() {
        Request request = new Request(Shape.ROCK);
        Result result = gameController.manualResult(request);

        verifyResult(result);
    }

    @RepeatedTest(10)
    public void testManualResult_shouldReturnAValidResultWhenPaperSelected() {
        Request request = new Request(Shape.PAPER);
        Result result = gameController.manualResult(request);

        verifyResult(result);
    }

    @Test
    public void testIdleResult_shouldReturnOkStatus() throws Exception {
        Request request = new Request(Shape.random());
        mockMvc.perform(get("/rest/game/result")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk());
    }

    @RepeatedTest(10)
    public void testIdleResult_shouldReturnAValidResult() {
        Result result = gameController.idleResult();

        verifyResult(result);
    }

    private void verifyResult(Result result) {
        switch (result.getWinner()) {
            case PLAYER1:
                assertTrue(result.getPlayer1Shape().beats(result.getPlayer2Shape()));
                break;
            case PLAYER2:
                assertTrue(result.getPlayer1Shape().isBeatenBy(result.getPlayer2Shape()));
                break;
            case DRAW:
                assertTrue(!result.getPlayer1Shape().beats(result.getPlayer2Shape())
                    && !result.getPlayer1Shape().isBeatenBy(result.getPlayer2Shape()));
                break;
            default:
                fail();
        }
    }
}