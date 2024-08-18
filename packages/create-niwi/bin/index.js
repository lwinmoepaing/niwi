#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import path from "path";
import gradient from "gradient-string";
import simpleGit from "simple-git";
import figlet from "figlet";
import fs from "fs";
import { createSpinner } from "nanospinner";

const git = simpleGit();

const gradientText = gradient(["#FC466B", "#3F5EFB"]);

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

const line = () => console.log(chalk.blue("-------------------- \n"));

const welcome = async () => {
  const iconText = await figlet("Niwi-Starter!!");
  await sleep(1000);
  const welcomeTitle = gradientText(iconText);
  console.log(welcomeTitle);
  line();
};

const QUESTIONS = [
  {
    type: "list",
    name: "template",
    message: "Do you want to choose another feature?",
    choices: ["default", "mini-apps", "portfolio-template"],
  },
];

const askFeature = async () => {
  const answers = await inquirer.prompt(QUESTIONS);
  const spinner = createSpinner("Checking features...");
  spinner.start();
  await sleep();
  spinner.success();

  if (answers.template === "portfolio-template") {
    console.log("This template is not currently available!");
    console.log(gradientText("Sorry..."));
    line();
    return;
  }

  const projectPath = path.join(process.cwd(), "niwi-starter");
  cloneRepo(answers.template, projectPath);
};

async function cloneRepo(branch, targetPath) {
  const repoUrl = "https://github.com/lwinmoepaing/niwi.git";

  // Clone the specific branch
  console.log(gradientText(`Downloading ${branch} ...`));
  const spinner = createSpinner("Loading...");
  spinner.start();
  await git.clone(repoUrl, targetPath, ["-b", branch]);
  spinner.success();

  // Remove all folders except `app/web`
  console.log(gradientText("Cleaning up unnecessary folders..."));

  const items = fs.readdirSync(targetPath);
  items.forEach((item) => {
    const itemPath = path.join(targetPath, item);
    if (item !== "apps") {
      if (fs.lstatSync(itemPath).isDirectory()) {
        fs.rmSync(itemPath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(itemPath);
      }
    }
  });

  // Remove `app/docs` folder
  const docsPath = path.join(targetPath, "apps", "docs");
  if (fs.existsSync(docsPath)) {
    fs.rmSync(docsPath, { recursive: true, force: true });
  }

  // Move `app/web` to the parent directory
  const webPath = path.join(targetPath, "apps", "web");
  const newWebPath = path.join(targetPath, "..", "web");
  if (fs.existsSync(webPath)) {
    fs.renameSync(webPath, newWebPath);
  }

  // Rename `web` to `niwi-starter`
  const finalPath = path.join(targetPath, "..", "niwi-starter");
  if (fs.existsSync(finalPath)) {
    fs.rmSync(finalPath, { recursive: true, force: true });
  }

  if (fs.existsSync(newWebPath)) {
    fs.renameSync(newWebPath, finalPath);
  }
  console.log(chalk.green("✔ Making Niwi-Starter successfully."));
}

(async () => {
  await welcome();
  askFeature();
})();
