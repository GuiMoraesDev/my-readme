import fs from "fs";
import path from "path";
import capitalizeFirstLetter from "./helpers/capitalizeFirstLetter";
import replaceDashBySpace from "./helpers/replaceDashBySpace";
import createReadmeContent from "./services/createReadmeContent";

export const generate = () => {
  const packageData = require(path.resolve("./package.json"));

  const replaceDash = replaceDashBySpace(
    packageData.name || "My package title"
  );

  const capitalizedName = capitalizeFirstLetter(replaceDash);

  const libs = { ...packageData.devDependencies, ...packageData.dependencies };

  const content = createReadmeContent({
    project_name: capitalizedName,
    project_cover_src:
      "https://raw.githubusercontent.com/GuiMoraesDev/my-readme/main/public/img/cover.png",
    project_cover_alt:
      "A book cover with the title 'my-pretty-readme', a quote saying 'this saves me much time. — the author' and my name bellow",
    project_libraries: libs,
    project_description: packageData.description,
  });

  fs.writeFile("README.md", content, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
};
