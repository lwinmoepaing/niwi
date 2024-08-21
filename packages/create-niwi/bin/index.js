#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import path from "path";
import gradient from "gradient-string";
import simpleGit from "simple-git";
import figlet from "figlet";
import fs from "fs";
import { createSpinner } from "nanospinner";
import { spawn } from "child_process";

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
    type: "input",
    name: "projectName",
    message: "Project name?",
    default: "niwi-starter", // Default project name if the user skips
  },
  {
    type: "list",
    name: "packageManager",
    message: "Choose your package manager:",
    choices: ["npm", "yarn", "pnpm"],
  },
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
  await sleep(800);
  spinner.success();

  const projectPath = path.join(process.cwd(), answers.projectName);
  cloneRepo(
    answers.template,
    projectPath,
    answers.packageManager,
    answers.projectName
  );
};

async function cloneRepo(branch, targetPath, packageManager, projectName) {
  if (fs.existsSync(targetPath) && fs.readdirSync(targetPath).length > 0) {
    console.log(
      chalk.red(
        `\nError: The directory "${targetPath}" already exists and is not empty.`
      )
    );
    return;
  }
  const repoUrl = "https://github.com/lwinmoepaing/niwi.git";

  // Clone the specific branch
  console.log(gradientText(`Creating ${branch} ...`));
  const spinner = createSpinner("Loading...");
  spinner.start();
  await git.clone(repoUrl, targetPath, [
    "-b",
    branch === "default" ? "main" : branch,
  ]);
  spinner.success();
  await sleep(500);
  spinner.clear();

  // Remove all folders except `app/web`
  console.log(gradientText("Upadating Dependencies..."));

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

  // Rename `web` to the chosen project name
  const finalPath = path.join(targetPath, "..", path.basename(targetPath));
  if (fs.existsSync(finalPath)) {
    fs.rmSync(finalPath, { recursive: true, force: true });
  }

  if (fs.existsSync(newWebPath)) {
    fs.renameSync(newWebPath, finalPath);
  }

  // Update the "name" attribute in package.json with the chosen project name
  const packageJsonPath = path.join(finalPath, "package.json");

  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

    // Get the project name from the finalPath
    let projectName = path.basename(finalPath);

    // Sanitize the project name to make it regex-compatible
    projectName = projectName
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9-._~]/g, "-") // Replace invalid characters with hyphens
      .replace(/^-+|-+$/g, "") // Remove leading or trailing hyphens
      .replace(/\.{2,}/g, "."); // Replace multiple consecutive dots with a single dot

    // If the sanitized name is still invalid, fallback to a default name
    const isValidName =
      /^(?:(?:@(?:[a-z0-9-*~][a-z0-9-*._~]*)?\/[a-z0-9-._~])|[a-z0-9-~])[a-z0-9-._~]*$/.test(
        projectName
      );
    if (!isValidName) {
      console.warn(
        chalk.yellow(
          `\nWarning: The project name "${projectName}" is invalid for npm packages.`
        )
      );
      projectName = "niwi-starter";
    }

    // Update the package.json name
    packageJson.name = projectName;

    // Write the updated package.json back to the file
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2)); // Pretty print with 2 spaces

    // Check if the user chose Yarn as the package manager
    if (packageManager === "yarn") {
      // Create an empty yarn.lock file
      const yarnLockPath = path.join(finalPath, "yarn.lock");
      fs.writeFileSync(yarnLockPath, "");
      console.log(chalk.green("✔ Created yarn.lock file for Yarn."));
    }
  }

  // Copy .env.example to .env if it exists
  const envExamplePath = path.join(finalPath, ".env.example");
  const envPath = path.join(finalPath, ".env");

  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log(chalk.green("✔ .env.example copied to .env ."));
  } else {
    console.log(chalk.yellow("⚠️  .env.example not found, skipping the copy."));
  }

  console.log(
    chalk.green(`✔ Created ${path.basename(targetPath)} successfully.`)
  );

  // Install dependencies using the selected package manager
  installDependencies(finalPath, packageManager, projectName);
}

function installDependencies(projectPath, packageManager, projectName) {
  console.log(
    gradientText(`Installing dependencies using ${packageManager}...`)
  );
  console.log("It'll take a little bit of time.\n");

  try {
    const installCmd =
      packageManager === "yarn"
        ? ["install"]
        : packageManager === "npm"
          ? ["install", "--legacy-peer-deps"]
          : ["install"];

    // Attempt to install dependencies and suppress output
    const installProcess = spawn(packageManager, installCmd, {
      cwd: projectPath,
      stdio: "inherit", // This ensures the output is shown in real-time
    });

    installProcess.on("close", (code) => {
      if (code === 0) {
        // Clear the console and show final instructions
        console.log("\n-----");
        console.log(chalk.green(`✔ Setup complete! Here are the next steps:`));
        console.log("-----");
        console.log(`\ncd ${projectName}`);
        console.log(
          `${packageManager} ${packageManager === "npm" ? "run " : ""}dev`
        );
        console.log("\n-----");
        console.log(gradientText(`Thank you for using Niwi-Starter!`));
      } else {
        console.error(
          chalk.red(
            `\nError: The installation process exited with code ${code}.`
          )
        );
      }
    });
  } catch (error) {
    console.error(chalk.red(`\nError: ${error.message}`));
    console.error(
      chalk.red(
        "Something went wrong during the installation. Please check the error above.\n"
      )
    );
  }
}

(async () => {
  await welcome();
  try {
    askFeature();
  } catch (error) {
    console.error(chalk.red(`\nError: ${error.message}`));
    console.error(
      chalk.red(
        "Something went wrong during the installation. Please check the error above.\n"
      )
    );
  }
})();
