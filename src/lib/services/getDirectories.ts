import { readdir } from "fs/promises";
import { resolve } from "path";

function sortFolders(foldersPath: string[]) {
  return foldersPath;
}

function removeRootPath(rootDir: string, arr: string[]) {
  const rootPath = resolve(rootDir);

  const rootPathRegExp = new RegExp(rootPath, "g");

  return arr.map((dir) => dir.replace(rootPathRegExp, ""));
}

async function getFiles(dir: string): Promise<string[]> {
  const dirs = await readdir(dir, { withFileTypes: true });

  const files = await Promise.all(
    dirs.map((dirent) => {
      const res = resolve(dir, dirent.name);

      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );

  return Array.prototype.concat(...files);
}

async function getDirectories(root: string) {
  const directories = await getFiles(root);

  const slicedDirectories = removeRootPath(root, directories);

  const sortedDirectories = sortFolders(slicedDirectories);

  return sortedDirectories;
}

export default getDirectories;
