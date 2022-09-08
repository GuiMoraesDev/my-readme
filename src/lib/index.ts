import path from "path";

import buildContent from "./services/buildContent";
import buildLibraryBadge from "./services/buildLibraryBadge";
import createReadmeFile from "./services/createReadmeFile";

interface ProjectLibsProps {
  [key: string]: string;
}

export const generate = () => {
  const packageData = require(path.resolve("./package.json"));

  const projectLibs: ProjectLibsProps = {
    ...packageData.devDependencies,
    ...packageData.dependencies,
  };

  const libs = Object.entries(projectLibs).map(([lib, version]) =>
    buildLibraryBadge(lib, version)
  );

  const content = buildContent({
    project_name: packageData.name,
    project_cover_src:
      "https://raw.githubusercontent.com/GuiMoraesDev/my-readme/main/public/img/cover.png",
    project_cover_alt:
      "A book cover with the title 'my-pretty-readme', a quote saying 'this saves me much time. — the author' and my name bellow",
    project_libraries: libs,
    project_description: packageData.description,
  });

  return createReadmeFile({
    content,
  });
};
