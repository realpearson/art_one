var cnv, cnvWidth, cnvHieght;

const strokeSize = 4;
let spacing = 2;

let iterations = 40;

let startX = 85;
let startY = 85;

let pointBuffer = [];


let pg;

function setup() {
  cnvWidth = document.getElementById("container").offsetWidth;
  cnvHeight = document.getElementById("container").offsetHeight;
  cnv = createCanvas(cnvWidth, cnvHeight).parent("container");  
  
  stroke(255);
  strokeWeight(strokeSize);
  //strokeCap(SQUARE);
  
  pg = createGraphics(400, 400);
  pg.background(235, 245, 225);
    
  for(let x = 0; x < iterations; x++){
    pointBuffer[x] = [];
    for(let y = 0; y < iterations; y++){
      const off = Math.floor(random(100000));
      pointBuffer[x][y] = {size: noise(off)*10, offset: off};
    } 
  }
}

function draw() {
  background(235, 245, 225);
  
  pg.background(235, 245, 225);
  pg.strokeWeight(strokeSize);
  pg.strokeCap(SQUARE);
  
  pg.stroke(35);
  
  for(let i = 4; i < iterations; i++){
    pg.strokeWeight(noise(pointBuffer[iterations-1][i].offset)*40);
    //pg.point(startX + iterations * spacing * (strokeSize*0.7), startY + i * spacing * (strokeSize*0.7));
    //pg.point(startX + i * spacing * (strokeSize*0.7), startY + iterations * spacing * (strokeSize*0.7));
    
    pg.line(startX + iterations * spacing * (strokeSize*0.7), startY + i * spacing * (strokeSize*0.7), startX +20 + iterations * spacing * (strokeSize*0.7), startY + 20 + i * spacing * (strokeSize*0.7));
    pg.line(startX + i * spacing * (strokeSize*0.7), startY + iterations * spacing * (strokeSize*0.7), startX +20 + i * spacing * (strokeSize*0.7), startY + 20 + iterations * spacing * (strokeSize*0.7));
  }
  
  for(let x = 0; x < iterations; x++){
    for(let y = 0; y < iterations; y++){
      pg.stroke(noise(pointBuffer[x][y].offset)*255, 30, 48);
      pg.strokeWeight(noise(pointBuffer[x][y].offset)*40); //20
      pointBuffer[x][y].offset += 0.01; //0.05
      
      //pg.point(startX + x * spacing * (strokeSize*0.7), startY + y * spacing * (strokeSize*0.7));
      
      //pg.line(startX + x * spacing * (strokeSize*0.7), startY + y * spacing * (strokeSize), startX +2 + x * spacing * (strokeSize), startY + 2 + y * spacing * (strokeSize*0.7));

      pg.line(startX + x * spacing * (strokeSize*0.7), startY + y * spacing * (strokeSize*0.7), startX +2 + x * spacing * (strokeSize*0.7), startY + 2 + y * spacing * (strokeSize*0.7));
    }
  }
  pg.filter(BLUR, 0.9 + noise(pointBuffer[0][0].offset)*2);
  scale(2, 2);
  const xpos = cnvWidth/2 - 400;
  const ypos = cnvHeight/2 - 400;
  image(pg, xpos/2, ypos/2);
}

function windowResized(){
  cnvWidth = document.getElementById("container").offsetWidth;
  cnvHeight = document.getElementById("container").offsetHeight;
  resizeCanvas(cnvWidth, cnvHeight);
}

function mousePressed(){
  fullscreen(!fullscreen());
}