import {client} from "./api";
import {PrimaryButton} from "../components/ui/PrimaryButton";

export const nextRound = (roomID) => {
    let round = parseInt(localStorage.getItem("round"));
    /**check if round == 10 (end game)*/
    if (round == localStorage.getItem("numRound")) {
        // Reset the game board after ending rounds
        client.send("/app/multi/games/" + roomID + "/rounds/end", {})
    }else{
        // round++
        round = round + 1;
        localStorage.setItem("round", round);
        // clear roundPoints
        localStorage.removeItem("roundPoints");
        // check questionType
        const questionList = JSON.parse(localStorage.getItem('questionList'));
        const nextQuestion = questionList[round - 1];
        if (nextQuestion.questionType == "MultipleChoice") {
            window.location.href = `/game/${roomID}/oracleguessing`;
        } else {
            window.location.href = `/game/${roomID}/imitationlearning`;
        }
    }
}