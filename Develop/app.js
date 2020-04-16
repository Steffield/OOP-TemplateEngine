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
        validate: response =>response.match(/^[A-Za-z ]+$/)? true: "enter a valid name"

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
        validate: response => response.match(/^[0-9-]+$/)? true: "Your input should be a number!"

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
        validate: response =>response.match(/^[A-Za-z ]+$/)? true: "enter a valid name"

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
        validate: response =>response.match(/^[A-Za-z ]+$/)? true: "enter a valid name"
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
       
        let manager = new Manager(response.name, response.id, response.email, response.officeNumber) 
        team.push(manager);
        selectRole();
      })
}

//===function to create engineer variable===

function engineerPrompts (){
    inquirer
    .prompt(engineerQuestions)
    .then(response => {
       
        let engineer = new Engineer(response.name, response.id, response.email, response.github) 
        team.push(engineer);
        selectRole();
      })
}

//===function to create intern variable===

function internPrompts (){
    inquirer
    .prompt(internQuestions)
    .then(response => {
        
        let intern = new Intern(response.name, response.id, response.email, response.school);
        team.push(intern);
        selectRole();
      })
}

//=========function to create select member type

function selectRole (){
    inquirer.prompt(memberQuestion)
    .then(response => {
        const member = {role: response.role};
        // console.log(member)
        if(response.role==="Engineer") {
            engineerPrompts();
        } else if (response.role ==="Intern"){
            internPrompts();
        }  else if(response.role ==="I don't want to add any more team members"){
            buildTeam();
            // console.log(team);
            
        }
    });
}

function buildTeam() {
  // Create the output directory if the output path doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR)
  }
  fs.writeFileSync(outputPath, render(team), "utf-8");
}


