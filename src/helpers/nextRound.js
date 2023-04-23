export const nextRound = (roomID) => {
    // round++
    let round = parseInt(localStorage.getItem("round"));
    round = round + 1;
    localStorage.setItem("round", round);
    // check if round == 10 (end game)
    // clear roundPoints
    localStorage.removeItem("roundPoints");
    // check questionType
    const questionList = JSON.parse(localStorage.getItem('questionList'));
    const nextQuestion = questionList[round - 1];
    if (nextQuestion.questionType == "MultipleChoice") {
        window.location.href = "/games/multiplechoice/" + roomID;
    }
}