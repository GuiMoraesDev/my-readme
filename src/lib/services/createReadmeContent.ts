interface LibrariesProps {
  [key: string]: (version: string) => string;
}

const libraries: LibrariesProps = {
  typescript: (version: string) =>
    `[![typescript](https://img.shields.io/badge/typescript-${version}-blue?logo=Typescript)](https://www.typescriptlang.org/)`,
};

interface Props {
  project_name?: string;
  project_cover_src?: string;
  project_cover_alt?: string;
  project_libraries?: {
    [key: string]: string;
  };
  project_description?: string;
}

const createReadmeContent = ({
  project_name,
  project_cover_src,
  project_cover_alt,
  project_libraries,
  project_description,
}: Props) => {
  const validlibs = Object.entries(project_libraries).filter(([lib]) =>
    Boolean(libraries[lib])
  );

  const libs = validlibs.map(([lib, version]) => libraries[lib](version));

  const rawContent: string[] = [
    `# ${project_name}`,
    `<img src="${project_cover_src}" alt="${project_cover_alt}" height="100px" align="right" />`,
    libs.join(",").replace(/,/g, "\n"),
    `<small>All badges are links to each doc</small>`,
    `## Description of that project 📖`,
    project_description,
  ];

  const parsedContent = rawContent.join("&&&").replace(/&&&/g, "\n\n");
  const finalContent = `${parsedContent}\n`;

  return finalContent;
};

export default createReadmeContent;
