import fs from "fs";

interface Props {
  filename?: string;
  content: string;
}

function createReadmeFile({ filename = "README", content }: Props) {
  fs.writeFile(`${filename}.md`, content, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
}

export default createReadmeFile;
