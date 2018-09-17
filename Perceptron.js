//could make more general by allowing activation function to be passed into guess

class Perceptron{
  constructor(inpSize){
    this.weights=[];
    for(let i=0;i<inpSize;i++){
      this.weights.push(random(-1,1));
      //changed to -1,1 instead of -PI,PI cause it 'trains' to correct results faster
      //and I want to be able to see it work quickly
    }
  }

  guess(inputs){
    let sum=0;
    for(let i=0;i<inputs.length;i++){
      sum+=this.weights[i]*inputs[i];
    }
    return this.activate(sum);
  }

  activate(sum){
    //use sine to split into 2 groups
    //let test = Math.sin(sum);
    //removed Math.sin cause it 'trains' to correct results faster
    //and I want to be able to see it work quickly
     if(sum>=0){
       return 1;
     }
     return -1;
  }

  train(inputs,actual,lrnRate){
    let error=this.loss(this.guess(inputs),actual);
    for(let i=0; i<this.weights.length;i++){
      this.weights[i]+=(error*inputs[i]*lrnRate);
    }
  }

  loss(guess,actual){
    return (actual-guess);
  }
};
