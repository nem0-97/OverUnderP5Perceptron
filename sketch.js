//this performs pretty bad if all training points are below equation(i think if all are above too)
//eg a parabola that rises quickly something like height*4*x^2+height=f(x)

//maybe add feature of perceptron tries to guess what the equation's graph looks like
/*


*/

//data to train with
//0,0 is in center of screen
let xs=[],ys=[],labels=[];
let bias=1;
let perTron;

//equation degree and coefficients(stored in order of degree of x)
//eg. ax^2+bx+c is stored as coeffs=[c,b,a] (this makes f(x) function tiny bit easier)
let polyDegree;
let coeffs=[];

//how many sample points to take when drawing equation and how many points in training data
//just felt like making them same amount
let res=100;
//the x's to use for those sample points
let sampXs=[];
let sampYs=[];
//get max distance from origin of f(sampX's) and use that to scale along y axis
let max=-Infinity;

//keep track of number times training to make learning rate smaller each time you train
let round=1;

function setup(){
  createCanvas(innerWidth,innerHeight);
  background(0);

  //have to init perTron here since it uses p5 functions(random)
  //3 inputs, x,y,and bias to deal with potential 0,0 problem
  perTron=new Perceptron(3);

  //come up with random polynomial with random degree 3 or below
  let polyDegree=int(random(4));
  //generate random coeffecients for the polynomial
  for(let i=0;i<=polyDegree;i++){
    coeffs.push(random(-1,1));
  }

  for(let i=0;i<res;i++){//build training data
    let x=random(-width/2,width/2);
    let y=random(-height/2,height/2);
    xs.push(x);
    ys.push(y);
    if(f(x)>y){//below equation
      labels.push(1);
    }
    else{//above or on equation
      labels.push(-1);
    }
  }

  //get x's and y's for sample points to use when drawing equation
  for(let i=-width/2;i<=width/2;i+=(width/res)){
    sampXs.push(i);
    sampYs.push(f(i));
  }
  //get max and min y for equation to use for scaling
  for(let i=0;i<sampYs.length;i++){
    if(abs(sampYs[i])>max){
      max=sampYs[i];
    }
  }
  for(let i=0;i<ys.length;i++){
    if(abs(ys[i])>max){
      max=ys[i];
    }
  }
}

function f(x){//calculate y using coefficients
  let result=coeffs[0];
  for(let i=1;i<coeffs.length;i++){
    result+=pow(x,i)*coeffs[i];
  }
  return result;
}

function mousePressed(){
  //training perceptron
  for(let i=0;i<xs.length;i++){
    perTron.train([xs[i],ys[i],bias],labels[i],5/round);
  }
  round++;
}

function draw(){
  //draw origin
  noStroke();
  fill(125,0,125);
  ellipse(0+width/2,map(0,-max,max,height,0),8,8);
  for(let i=0;i<xs.length;i++){
    //for each point make a guess if it is right fill in point green else red
    if(perTron.guess([xs[i],ys[i],bias])==labels[i]){
    //if(labels[i]==1){
      fill(0,255,0);
    }
    else{
      fill(255,0,0);
    }
    noStroke();
    //make these correct in pixel coords
    ellipse(xs[i]+width/2,map(ys[i],-max,max,height,0),8,8);
  }
  //graph equation
  strokeWeight(2);
  stroke(0,0,255);
  beginShape();
  noFill();
  for(let i=0;i<sampXs.length;i++){
    vertex(sampXs[i]+width/2,map(f(sampXs[i]),-max,max,height,0));
  }
  endShape();
}
