export const normalizeGameMode = (gameMode) =>{
    switch(gameMode) {
        case "MultipleChoice":
            return("Oracle Guessing Multiple Choice")
        case "Mixed":
            return("Bit of Both")
        case "HanziDrawing":
            return("Hanzi Imitation Drawing")
        default:
            return(gameMode)
    }
}