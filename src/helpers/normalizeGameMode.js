export const normalizeGameMode = (gameMode) =>{
    switch(gameMode) {
        case "MultipleChoice":
            return("Oracle Script Guessing")
        case "Mixed":
            return("Bit of Both")
        case "HanziDrawing":
            return("Hanzi Imitation")
        default:
            return(gameMode)
    }
}