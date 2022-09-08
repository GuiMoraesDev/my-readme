import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter";
import replaceDashBySpace from "../helpers/replaceDashBySpace";

interface Props {
  project_name?: string;
  project_cover_src?: string;
  project_cover_alt?: string;
  project_libraries?: string[];
  project_description?: string;
}

const buildContent = ({
  project_name = "My package title",
  project_cover_src,
  project_cover_alt,
  project_libraries,
  project_description,
}: Props) => {
  const replaceDash = replaceDashBySpace(project_name);

  const capitalizedName = capitalizeFirstLetter(replaceDash);

  const rawContent: string[] = [
    `# ${capitalizedName}`,
    `<img src="${project_cover_src}" alt="${project_cover_alt}" height="100px" align="right" />`,
    project_libraries.join(",").replace(/,/g, "\n"),
    `<small>Some badges are links to the library doc</small>`,
    `## Description of that project 📖`,
    project_description,
  ];

  const parsedContent = rawContent.join("&&&").replace(/&&&/g, "\n\n");
  const finalContent = `${parsedContent}\n`;

  return finalContent;
};

export default buildContent;
