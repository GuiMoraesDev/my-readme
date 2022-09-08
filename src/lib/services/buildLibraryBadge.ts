export const libsUrlDoc = {
  typescript: "https://www.typescriptlang.org/",
};

function buildLibraryBadge(lib: string, version: string) {
  const isDocUrlKnown = Object.keys(libsUrlDoc).includes(lib);

  return isDocUrlKnown
    ? `[![${lib}](https://img.shields.io/badge/${lib}-${version}-blue?logo=${lib})](${libsUrlDoc[lib]})`
    : `![${lib}](https://img.shields.io/badge/${lib}-${version}-blue?logo=${lib})`;
}

export default buildLibraryBadge;
