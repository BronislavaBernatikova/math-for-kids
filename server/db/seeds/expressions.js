
let createRecord = (knex, operator, difficulty) => {
  const expression = makeExpression(difficulty);
  // Inserts seed entries
  return knex('expressions').insert({
    operator,
    difficulty,
    num1: expression.randNum1,
    num2: expression.randNum2,
    solution: expression[operator]()
  });
  return true;
};

  exports.seed = function(knex, Promise) {

    //try never delete:
    let records = [];
    const operators = ["add", "subtract", "multiply", "divide"];
    const difficulties = [10, 100, 300, 500, 700, 1000];
    operators.forEach( operator => {
      difficulties.forEach( difficulty => {
        for (let i = 1; i < 5; i += 1) {
          records.push(createRecord(knex, operator, difficulty));
        }
      });
    });
    return Promise.all(records);

    // Deletes ALL existing entries
    // return knex('answers').del()
    // .then(()=> {
    //   return knex('expressions').del()
    //     .then(() => {
    //       let records = [];
    //       const types = ["add", "subtract", "multiply", "divide"];
    //       const difficulties = [10, 100, 300, 500, 700, 1000];
    //       types.forEach( type => {
    //         difficulties.forEach( difficulty => {
    //           for (let i = 1; i < 2; i += 1) {
    //             records.push(createRecord(knex, type, difficulty));
    //           }
    //         });
    //       });
    //       return Promise.all(records);
    //     });
    // })
  }

  function ArithmeticExpression (randNum1,randNum2){
    this.randNum1 = randNum1;
    this.randNum2 = randNum2;
  }
  ArithmeticExpression.prototype.add = function (){
    return (this.randNum1 + this.randNum2);
  }
  ArithmeticExpression.prototype.subtract = function (){
    return (this.randNum1 - this.randNum2);
  }
  ArithmeticExpression.prototype.multiply = function (){
    return (this.randNum1 * this.randNum2);
  }
  ArithmeticExpression.prototype.divide = function(){
    return (this.randNum1 / this.randNum2);
  }

  function makeExpression (difficulty) {
    let num1;
    let num2;
    do {
      num1 = Math.floor((Math.random() * difficulty) + 1);
      num2 = Math.floor((Math.random() * difficulty) + 1);
    }
    while(num1 <= num2);
    return expression = new ArithmeticExpression(num1,num2);
  }
