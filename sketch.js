var ball, position, database;

function setup(){
    createCanvas(500,500);
    database = firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var ballPositionRef = database.ref("ball/position");
    //listening to database
    //on function creates a listener that continuously listens to the data base
    ballPositionRef.on("value",readPos,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ballPositionRef = database.ref("ball/position");
    ballPositionRef.set({
        x : ball.x + x,
        y : ball.y + y
    })
}

function readPos(data) {
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showError() {
    console.log("error");

}