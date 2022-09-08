import fs from "fs";
import path from "path";

import { generate, Props } from "./lib";

const prompts = require("prompts");

const packageJsonFile = path.resolve("./package.json");
const readmePrettifyFile = path.resolve("./readme-prettify.json");

const packageJsonData = require(packageJsonFile);

const questions = [
  {
    type: "text",
    name: "project_name",
    message: "Project name?",
    initial: packageJsonData.name,
  },
  {
    type: "text",
    name: "project_cover_src",
    message: "Cover image url",
  },
  {
    type: "text",
    name: "project_cover_alt",
    message: "Cover image alt",
  },
  {
    type: "text",
    name: "project_description",
    message: "Project description?",
    initial: packageJsonData.description,
  },
];
const { argv } = process;

(async () => {
  let response: Props;

  const existsReadmePrettifyFile = fs.existsSync(readmePrettifyFile);

  if (existsReadmePrettifyFile) {
    const readmePrettifyData = require(readmePrettifyFile);

    response = {
      project_name: readmePrettifyData.project_name || packageJsonData.name,
      project_cover_src: readmePrettifyData.project_cover_src,
      project_cover_alt: readmePrettifyData.project_cover_alt,
      project_description:
        readmePrettifyData.project_description || packageJsonData.description,
    };
  }

  if (argv.includes("--prompt") || !existsReadmePrettifyFile) {
    response = await prompts(questions);
  }

  generate(response);
})();
