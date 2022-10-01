const boardSlotVector = [ // these are the positions for the 100x100 slots, I used const since i won't be chnaging this array
    [-165, -165],
    [-50, -165],
    [+65, -165], //this first three are the top row, since each alots are 100x100, we'll shift them by 100+15 since the lines I used has 15 thickness
    [-165, -50],
    [-50, -50],
    [+65, -50],//second row, we'll shift it by 100 down and another 15 for the thickness of the line
    [-165, 65],
    [-50, 65],
    [+65, 65]//the third row, we'll shift the second row by the same account to make the third row
]; 

const boardLinesPosition = [ //multidimenssional arrays again just cause I like them, 
    [-65, -165, 15, 330, 20],
    [50, -165, 15, 330, 20],
    [-165, -65, 330, 15, 20],
    [-165, 50, 330, 15, 20]
];

let won = false;

let backgroundColor = 150;

let boardData = []; //this is the container for the moves that players will make

let currentPlayer = 1;

let Player1Score = 0;
let Player2Score = 0;
let PlayerCPUScore = 0;

let opponent = 2;

let randomMove;

let mode = 0;

let currentlyAvailableSlots = [0,1,2,3,4,5,6,7,8];

function setup() {
    createCanvas(innerWidth,innerHeight);
    background(backgroundColor);
    multiPlayer = createButton('2 Player Mode');
    multiPlayer.style("font-size", "20px");
    multiPlayer.style('background-color', color(246,190,0));
    multiPlayer.position(innerWidth/2+boardSlotVector[0][0]-250, innerHeight/2+boardSlotVector[0][1]+150);
    multiPlayer.mousePressed(function(){ changeMode(1); });

    VSHardCPU = createButton('Vs okay CPU');
    VSHardCPU.style("font-size", "20px");
    VSHardCPU.style('background-color', color(246,190,0));
    VSHardCPU.position(innerWidth/2+boardSlotVector[0][0]-250, innerHeight/2+boardSlotVector[0][1]+100);
    VSHardCPU.mousePressed(function(){ changeMode(2); });

    playAgainButton = createButton('Play Again');
    playAgainButton.style("font-size", "40px");
    playAgainButton.style('background-color', color(246,190,0));
    playAgainButton.position(innerWidth/2+250, innerHeight/2+50);
    playAgainButton.mousePressed(playAgain);
    playAgainButton.hide();
}

function draw() {
    if (mode === 0){
        background(backgroundColor);
        translate(innerWidth/2, innerHeight/2);
        textSize(32);
        fill(150,40,40);
        text("Select A Mode to play",-50,-50);
    }else
    if (!won && (mode === 1)) {
        translate(innerWidth/2, innerHeight/2);
        angleMode(DEGREES)
        background(backgroundColor);
        drawBoard();
        checkWin();
        titleAndLabels();
    } else
    if ((mode === 2) && !won) {
        translate(innerWidth/2, innerHeight/2);
        angleMode(DEGREES)
        background(backgroundColor);
        drawBoard();
        checkWin();
        if (currentPlayer === 3){
            CPUMove();
            currentPlayer = 1;
        }
        titleAndLabels();
    }

    if (won);{
        playAgainButton.show();
    }
     if(!won){
        playAgainButton.hide();
    }
}

function mousePressed(){
    if (!won) {
        for (let i = 0; i < boardSlotVector.length; i++) {
            if (mouseX > innerWidth/2+boardSlotVector[i][0] && mouseX < innerWidth/2+boardSlotVector[i][0]+100 && mouseY > innerHeight/2+boardSlotVector[i][1] && mouseY < innerHeight/2+boardSlotVector[i][1]+100) {
                if ((currentPlayer === 1) && (boardData[i] == null)) {
                    boardData[i] = 'X';
                    currentPlayer = opponent;
                    arrayRemove(currentlyAvailableSlots, i);
                    print(currentlyAvailableSlots);
                } else if ((currentPlayer === 2) && (boardData[i] == null)){
                    boardData[i] = 'O';
                    arrayRemove(currentlyAvailableSlots, i);
                    print(currentlyAvailableSlots);
                    currentPlayer = 1;
                }
            }           
        }   
    }


}

function changeMode(modeSelected){
    mode = modeSelected;
    boardData = [];
    Player1Score = 0;
    Player2Score = 0;
    PlayerCPUScore = 0;
    currentPlayer = 1;
    won = false;
    if(mode === 2){
        opponent = 3;
    }
    if(mode === 1){
        opponent = 2;
    }
    if(modeSelected === 3){
        opponent = 4
    }
    currentlyAvailableSlots = [0,1,2,3,4,5,6,7,8];
}

function drawBoard(){
    push();
    fill(246,190,0);
    if (mode == 2){
        fill(250,50,75);
    }
    rectMode(CORNER);
    for (let i = 0; i < boardLinesPosition.length; i++) { //this just loops through the boardLinesPosition and uses them in rect()
        rect(boardLinesPosition[i][0], boardLinesPosition[i][1], boardLinesPosition[i][2], boardLinesPosition[i][3],boardLinesPosition[i][4], boardLinesPosition[i][5])
    }

    for (let i = 0; i < boardData.length; i++) { //this loops through thge boardData and it checks if they are not null, then it draws either O or X in the position that they are found in the array
        if ((boardData[i] != null)&(boardData[i]=='X')) {
            drawX(boardSlotVector[i],0,0);
        } else if ((boardData[i] != null)&(boardData[i]=='O')){
            drawO(boardSlotVector[i],0,0);
        }
    }
    pop();

}

function arrayRemove(arr, item) { 
    
    for( var i = 0; i < arr.length; i++){ 
    
        if ( arr[i] === item) { 
    
            arr.splice(i, 1); 
        }
    
    }
}

function playAgain(){
    boardData = [];
    currentlyAvailableSlots = [0,1,2,3,4,5,6,7,8];
    won = false;
}

function drawX(slotPosition, XOffset, YOffset){
    push();
    noStroke();
    fill(150,40,40);
    translate(slotPosition[0]+50+XOffset, slotPosition[1]+50+YOffset);
    rotate(45);
    rectMode(CENTER);
    rect(0, 0,20,80,20);
    rotate(90);
    rectMode(CENTER);
    rect(0, 0,20,80,20);
    pop();
}

function drawO(slotPosition, XOffset, YOffset){
    push();
    noStroke();
    fill(40,150,40);
    translate(slotPosition[0]+50+XOffset, slotPosition[1]+50+YOffset);
    circle(0, 0, 70)
    fill(backgroundColor);
    circle(0, 0, 40)
    pop();
}

function checkWin(){ //there are 8 different winning positions on TicTacToe so we'll check for all of them
    if ((boardData[0] != null) && (boardData[0] === boardData[1]) && (boardData[1] === boardData[2])) {
        addPlayerScore(boardData[0],1);22
        rect(boardLinesPosition[0][0]-100, boardLinesPosition[0][1]+40, boardLinesPosition[3][2], boardLinesPosition[3][3],boardLinesPosition[3][4], boardLinesPosition[3][5]);
        won = true;
    } else
    if ((boardData[3] != null) && (boardData[3] === boardData[4]) && (boardData[4] === boardData[5])) {
        addPlayerScore(boardData[3],1);
        rect(boardLinesPosition[0][0]-100, boardLinesPosition[0][1]+155, boardLinesPosition[3][2], boardLinesPosition[3][3],boardLinesPosition[3][4], boardLinesPosition[3][5]);
        won = true;
    } else
    if ((boardData[6] != null) && (boardData[6] === boardData[7]) && (boardData[7] === boardData[8])) {
        addPlayerScore(boardData[6],1);
        rect(boardLinesPosition[0][0]-100, boardLinesPosition[0][1]+270, boardLinesPosition[3][2], boardLinesPosition[3][3],boardLinesPosition[3][4], boardLinesPosition[3][5]);
        won = true;
    } else//this first three statements are for the horizontal wins
    if ((boardData[0] != null) && (boardData[0] === boardData[3]) && (boardData[3] === boardData[6])) {
        addPlayerScore(boardData[0],1);
        rect(boardLinesPosition[0][0]-55, boardLinesPosition[0][1], boardLinesPosition[0][2], boardLinesPosition[0][3],boardLinesPosition[0][4], boardLinesPosition[0][5]);
        won = true;
    }else
    if ((boardData[1] != null) && (boardData[1] === boardData[4]) && (boardData[4] === boardData[7])) {
        rect(boardLinesPosition[0][0]+60, boardLinesPosition[0][1], boardLinesPosition[0][2], boardLinesPosition[0][3],boardLinesPosition[0][4], boardLinesPosition[0][5]);
        addPlayerScore(boardData[1],1);
        won = true;
    }else
    if ((boardData[2] != null) && (boardData[2] === boardData[5]) && (boardData[5] === boardData[8])) {
        addPlayerScore(boardData[2],1);;
        rect(boardLinesPosition[0][0]+175, boardLinesPosition[0][1], boardLinesPosition[0][2], boardLinesPosition[0][3],boardLinesPosition[0][4], boardLinesPosition[0][5]);
        won = true;
    }else// these other three are for the vertical win positions
    if ((boardData[0] != null) && (boardData[0] === boardData[4]) && (boardData[4] === boardData[8])) {
        addPlayerScore(boardData[0],1);
        push();
        rectMode(CENTER);
        rotate(135);
        rect(0, 0, boardLinesPosition[0][2], boardLinesPosition[0][3]+120,boardLinesPosition[0][4], boardLinesPosition[0][5]);
        pop();
        won = true;
    }else
    if ((boardData[2] != null) && (boardData[2] === boardData[4]) && (boardData[4] === boardData[6])) {
        addPlayerScore(boardData[2],1);
        push();
        rectMode(CENTER);
        rotate(45);
        rect(0, 0, boardLinesPosition[0][2], boardLinesPosition[0][3]+120,boardLinesPosition[0][4], boardLinesPosition[0][5]);
        pop();
        won = true;
    }else if (currentlyAvailableSlots.length == 0){// these last 2 are for the diagonal win positions
        won = true;
    }
}

function addPlayerScore(player, Score){
    if (player === 'X') {
        Player1Score += 1;
    }
    if (player === 'O') {
        Player2Score += 1;
    }
}

function titleAndLabels(){
    push();
    fill(250);
    translate(boardSlotVector[0][0]+40,boardSlotVector[0][1]);
    textSize(32);
    text("Player "+currentPlayer+" Turn",-50,-50);
    pop();
    push();
    translate(boardSlotVector[2][0]+245,boardSlotVector[2][1]+125);
    textSize(32);
    fill(150,40,40);
    text("Player 1 Score: " + Player1Score,-50,-50);
    translate(0, 75);
    fill(40,150,40);
    if (opponent == 2){
        text("Player 2 Score: " + Player2Score,-50,-50);
    }
    if (opponent == 3){
        text("CPU Score: " + Player2Score,-50,-50);
    }

    pop();
    push();
    if (currentPlayer === 1) {
        drawX(boardSlotVector[2], -50, -115);
    }else if (currentPlayer === 2) {
        drawO(boardSlotVector[2], -50, -115);
    }
    pop();
}

function CPUMove(){ 
    if (!won) {
        CPUMoveloop:
        while (currentlyAvailableSlots.length > 0){
            let checkPriority =  ['O', 'X'];
            for (let j = 0; j < checkPriority.length; j++) {
                for (let i = 0; i < 9; i+=3) {
                    if((boardData[i]===boardData[i+1]) && (boardData[i] === checkPriority[j]) && (boardData[i+2] == null)){
                        boardData[i+2] = 'O';
                        arrayRemove(currentlyAvailableSlots, i+2);
                        break CPUMoveloop; //check if each row has the same value that is not null in first and second position then set the third slot to 'O' if so
                    }
                }
                for (let i = 0; i < 9; i+=3) {
                    if((boardData[i]===boardData[i+2]) && (boardData[i] === checkPriority[j]) && (boardData[i+1] == null)){
                        boardData[i+1] = 'O';
                        arrayRemove(currentlyAvailableSlots, i+1);
                        break CPUMoveloop; //check if each row has the same value that is not null in first and third position then set the second slot to 'O' if so
                    }
                }
                for (let i = 0; i < 9; i+=3) {
                    if((boardData[i+1]===boardData[i+2]) && (boardData[i+1] === checkPriority[j]) && (boardData[i] == null)){
                        boardData[i] = 'O';
                        arrayRemove(currentlyAvailableSlots, i);
                        break CPUMoveloop; //check if each row has the same value that is not null in second and third position then set the first slot to 'O' if so
                    }
                }
                for (let i = 0; i < 3; i++) {
                    if((boardData[i]===boardData[i+3]) && (boardData[i] === checkPriority[j]) && (boardData[i+6] == null)){
                        boardData[i+6] = 'O';
                        arrayRemove(currentlyAvailableSlots, i+6);
                        break CPUMoveloop; //check each column if it has the same value that is not null in first and second slot then set the third slot to 'O' if so
                    }
                    
                }
                for (let i = 0; i < 3; i++) {
                    if((boardData[i]===boardData[i+6]) && (boardData[i] === checkPriority[j] && (boardData[i+3] == null))){
                        boardData[i+3] = 'O';
                        arrayRemove(currentlyAvailableSlots, i+3);
                        break CPUMoveloop; //check each column if it has the same value that is not null in first and third slot then set the second slot to 'O' if so
                    }
                    
                }
                for (let i = 0; i < 3; i++) {
                    if((boardData[i+3]===boardData[i+6]) && (boardData[i+3] === checkPriority[j]) && (boardData[i] == null)){
                        boardData[i] = 'O';
                        arrayRemove(currentlyAvailableSlots, i);
                        break CPUMoveloop; //check each column if it has the same value that is not null in secpnd and third slot then set the first slot to 'O' if so
                    }
                    
                }
                if((boardData[0] === boardData[4]) && (boardData[0] === checkPriority[j]) && (boardData[8] == null)){
                    boardData[8] = 'O';
                    arrayRemove(currentlyAvailableSlots, 8);
                    break CPUMoveloop;
                }
                if((boardData[4] === boardData[8]) && (boardData[4] === checkPriority[j]) && (boardData[0] == null)){
                    boardData[0] = 'O';
                    arrayRemove(currentlyAvailableSlots, 0);
                    break CPUMoveloop;
                }
                if((boardData[0] === boardData[8]) && (boardData[0] === checkPriority[j]) && (boardData[4] == null)){
                    boardData[4] = 'O'
                    arrayRemove(currentlyAvailableSlots, 4);
                    break CPUMoveloop;
                }// these 3 ifs are for the 1,5,9 diagonal
                if((boardData[2] === boardData[4]) && (boardData[2] === checkPriority[j]) && (boardData[6] == null)){
                    boardData[6] = 'O';
                    arrayRemove(currentlyAvailableSlots, 6);
                    break CPUMoveloop;
                }
                if((boardData[4] === boardData[6]) && (boardData[4] === checkPriority[j]) && (boardData[2] == null)){
                    boardData[2] = 'O';
                    arrayRemove(currentlyAvailableSlots, 2);
                    break CPUMoveloop;
                }
                if((boardData[2] === boardData[6]) && (boardData[2] ===checkPriority[j]) && (boardData[4] == null)){
                    boardData[4] = 'O'
                    arrayRemove(currentlyAvailableSlots, 4);
                    break CPUMoveloop;
                }// these 3 ifs are for the 3,5,7 diagonal
            }
            while(currentlyAvailableSlots.length > 0){
                if (currentlyAvailableSlots.length > 1) {
                    randomMove = int(random(0,currentlyAvailableSlots.length));
                    print(randomMove);
                    if (boardData[randomMove] == null) {
                        boardData[randomMove] = 'O';   
                        arrayRemove(currentlyAvailableSlots, randomMove);        
                        break CPUMoveloop;     
                    } else{
                        arrayRemove(currentlyAvailableSlots, randomMove);
                        continue;
                    }
                }
                break CPUMoveloop;
            }
        }      
    }
}
