class Test extends Base {

  constructor(){
    super();
    this.runAQuery();
  }

  runAQuery(){
    // Just an example of how to run a query
    this.db.all((data)=>{
      console.log('Result of the query "all"',data);
      this.runAnotherQuery();
    });
  }

  runAnotherQuery(){
    // Just an example of how to run a query
    this.db.byFullName(['Kalle','Anka'],(data)=>{
      console.log('Result of the query "byFullName"',data);
      this.runAThirdQuery();
    });
  }

  runAThirdQuery(){
    // Just an example of how to run a query
    this.db.newStudent({
        firstName:'Anna',
        lastName:'Andersson',
        course:5
      },(data)=>{
      console.log('Result of the query "newStudent"',data);
    });
  }
  
  static get sqlQueries(){
    //
    // Please note: This part of the class is read by
    // the Node server on start so you can not build
    // queries dynamically here.
    //
    // But you can use ? as placeholders for parameters.
    //
    return {
      all: `
        select * from students 
      `,
      byFullName: `
        select * from students
        where firstName = ? && lastName = ?
      `,
      newStudent: `
        INSERT INTO students SET ?
      `
    }
  }

}