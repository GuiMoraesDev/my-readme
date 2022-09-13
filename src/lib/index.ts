import fs from "fs";
import path from "path";

import buildContent from "./services/buildContent";
import buildLibraryBadge from "./services/buildLibraryBadge";
import createReadmeFile from "./services/createReadmeFile";
import getDirectories from "./services/getDirectories";

interface ProjectLibsProps {
  [key: string]: string;
}

export interface Props {
  project_name?: string;
  project_cover_src?: string;
  project_cover_alt?: string;
  project_description?: string;
}

export const generate = async ({
  project_name,
  project_cover_src,
  project_cover_alt,
  project_description,
}: Props) => {
  const directories = await getDirectories("./src");

  console.log('directories', directories);

  const packageData = require(path.resolve("./package.json"));

  const projectLibs: ProjectLibsProps = {
    ...packageData.devDependencies,
    ...packageData.dependencies,
  };

  const libs = Object.entries(projectLibs).map(([lib, version]) =>
    buildLibraryBadge(lib, version)
  );

  const content = buildContent({
    project_name,
    project_cover_src,
    project_cover_alt,
    project_libraries: libs,
    project_description,
  });

  return createReadmeFile({
    content,
  });
};
