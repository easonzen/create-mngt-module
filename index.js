#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const commander = require("commander");
const chalk = require("chalk");
const ora = require("ora");
// const inquirer = require("inquirer");

const spinner = ora();

const sourcePath = path.join(__dirname, "template");

const program = commander
  .version(require("./package.json").version)
  .arguments("<project-directory>")
  .action(function(name) {
    projectName = name;
  })
  .parse(process.argv);

if (typeof projectName === "undefined") {
  spinner.fail("请指定要创建的项目目录名:");
  console.log("  " + chalk.cyan(program.name()) + chalk.green(" <项目目录>"));
  console.log();
  console.log("例如:");
  console.log("  " + chalk.cyan(program.name()) + chalk.green(" my-react-app"));
  console.log();
  process.exit(1);
}

if (fs.existsSync(sourcePath)) {
  try {
    fs.copySync(sourcePath, projectName);
  } catch (error) {
    chalk.red(error);
  }
}
