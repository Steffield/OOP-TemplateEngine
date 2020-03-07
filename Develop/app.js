const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const team =[];

const managerQuestions=[
      {
        type: "input",
        name: "name",
        message: "What is your manager's name?",
        validate: response =>response.match(/^[A-Za-z]+$/)? true: "enter a valid name"

      },
      {
        type: "input",
        name: "id",
        message: "What is your manager's ID?",
        validate: response => response.match(/^[0-9a-zA-Z]+$/) ? true: "enter a valid ID"

      },
      {
        type: "input",
        name: "email",
        message: "What is your manager's email?",
        validate: response => response.includes("@") && response.includes(".") ? true: "email invalid"

      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is your manager's office number?",
        validate: response => response.match(/^[0-9]+$/)? true: "Your input should be a number!"

      },
];

const memberQuestion= 
      {
        type: "list",
        name: "role",
        message: "Which type of team member would you like to add?",
        choices:["Engineer", "Intern", "I don't want to add any more team members"]
      };

const internQuestions =[
      {
        type: "input",
        name: "name",
        message: "What is your intern's name?",
        validate: response =>response.match(/^[A-Za-z]+$/)? true: "enter a valid name"

      },
      {
        type: "input",
        name: "id",
        message: "What is your intern's ID?",
        validate: response => response.match(/^[0-9a-zA-Z]+$/) ? true: "enter a valid ID"

      },
      {
        type: "input",
        name: "email",
        message: "What is your intern's email?",
        validate: response => response.includes("@") && response.includes(".") ? true: "email invalid"

      },
      {
        type: "input",
        name: "school",
        message: "What is your intern's school?"
      }
    ];

const engineerQuestions =[
      {
        type: "input",
        name: "name",
        message: "What is your engineer's name?",
        validate: response =>response.match(/^[A-Za-z]+$/)? true: "enter a valid name"
      },
      {
        type: "input",
        name: "id",
        message: "What is your engineer's ID?",
        validate: response => response.match(/^[0-9a-zA-Z]+$/) ? true: "enter a valid ID"

      
      },
      {
        type: "input",
        name: "email",
        message: "What is your engineer's email?",
        validate: response => response.includes("@") && response.includes(".") ? true: "email invalid"
      },
      {
        type: "input",
        name: "github",
        message: "What is your engineer's Github username?"
      }
    ];

//=========functions==========================
managerPrompts();
// //===function to create manager variable===

function managerPrompts (){
    inquirer
    .prompt(managerQuestions)
    .then(response => {
        // const managerData = {
        //   name: response.name,
        //   id: response.id,
        //   email: response.email,
        //   role: "Manager",
        //   officeNumber: response.officeNumber,
        // };
        // console.log(managerData);
        //create manager object
        let manager = new Manager(response.name, response.id, response.email, response.officeNumber) 
        team.push(manager);
        selectRole();
        // return managerData;
      })
}

//===function to create engineer variable===

function engineerPrompts (){
    inquirer
    .prompt(engineerQuestions)
    .then(response => {
        // const engineerData = {
        //   name: response.name,
        //   id: response.id,
        //   email: response.email,
        //   role: "Engineer",
        //   github: response.github,
        // };
        let engineer = new Engineer(response.name, response.id, response.email, response.github) 
        team.push(engineer);
        selectRole();
        // return engineerData;
      })
}

//===function to create intern variable===

function internPrompts (){
    inquirer
    .prompt(internQuestions)
    .then(response => {
        // const internData = {
        //   name: response.name,
        //   id: response.id,
        //   email: response.email,
        //   role: "Intern",
        //   school: response.school,
        // };
        let intern = new Intern(response.name, response.id, response.email, response.school);
        console.log(intern);
        team.push(intern);
        selectRole();
        // return internData;
      })
}

//=========function to create select member type

function selectRole (){
    inquirer.prompt(memberQuestion)
    .then(response => {
        const member = {role: response.role};
        console.log(member)
        if(response.role==="Engineer") {
            engineerPrompts();
        } else if (response.role ==="Intern"){
            internPrompts();
        }  else if(response.role ==="I don't want to add any more team members"){
            render(team);
            console.log(team);
            
        }
    });
}




    

//if choice 3 is selected create output folder with team html
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
