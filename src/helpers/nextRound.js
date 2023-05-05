import {client} from "./api";

export const nextRound = (roomID) => {
    let round = parseInt(localStorage.getItem("round"));
    /**check if round == 10 (end game)*/
    if (round == 10) {
        // Reset the game board after ending rounds
        client.send("/app/multi/games/" + roomID + "/rounds/end", {})

        // go back to lobby for now
        // waitingRoom need clarify owner or player
        window.location.href = "/lobby"
    }
    // round++
    round = round + 1;
    localStorage.setItem("round", round);
    // clear roundPoints
    localStorage.removeItem("roundPoints");
    // check questionType
    const questionList = JSON.parse(localStorage.getItem('questionList'));
    const nextQuestion = questionList[round - 1];
    if (nextQuestion.questionType == "MultipleChoice") {
        window.location.href = "/games/multiplechoice/" + roomID;
    } else {
        window.location.href = '/games/imitationinspect/' + roomID;
    }
}