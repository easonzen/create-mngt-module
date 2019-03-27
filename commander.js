#!/usr/bin/env node

const commander = require("commander");
const chalk = require("chalk");
const inquirer = require("inquirer");

const program = commander
  .version(require("../package.json").version)
  .arguments("<project-directory>")
  .usage(chalk.green("<project-directory>") + " [options]")
  .option("-u, --upgrade", "升级项目到tiger-new最新构建版本")
  .action(function(name) {
    projectName = name;
  })
  .parse(process.argv);

inquirer
  .prompt([
    {
      name: "version",
      type: "input",
      message: "请输入项目版本号：",
      default: "1.0.0"
    },
    {
      name: "useCdn",
      type: "confirm",
      message:
        "该项目是否需要托管静态资源到cdn服务器?" +
        chalk.grey("（默认仅支持ssh rsync方式上传到cdn）"),
      default: true
    },
    {
      name: "libs",
      type: "list",
      choices: [
        { name: "无框架依赖", value: 0 },
        { name: "jquery 项目", value: 1 },
        { name: "react 项目", value: 2 },
        { name: "jquery + react 项目", value: 3 }
      ],
      message:
        "请选择项目框架" + chalk.grey("（将会默认安装所选相关框架依赖）") + ":",
      default: 2
    }
  ])
  .then(answsers => {
    console.log(answsers);
    console.log(program.version());
  });
