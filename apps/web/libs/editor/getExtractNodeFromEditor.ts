import { getPlainTextFromNode } from "@/components/niwi-blog/niwi-text-editor/editor-utils/editor-text-node-helper";
import { EditorRootJson } from "@/types/editor-json";

function getExtractText(strArray: string[]): [string, string] {
  // Filter out empty strings
  const nonEmptyStrings = strArray.filter((str) => str.trim() !== "");

  // Get the first two non-empty strings
  const title = nonEmptyStrings[0] || "";
  const subTitle = nonEmptyStrings[1] || "";

  return [title, subTitle];
}

export const getExtractNodeFromEditor = (
  json: string
): [string, string, string[]] => {
  const imageList: string[] = [];
  const parseJson = JSON.parse(json) as EditorRootJson;
  const textList: string[] = [];
  parseJson.root.children.forEach((child) => {
    if (child.type === "Niwi-Image-Container" && child.src) {
      imageList.push(child.src);
    }
    textList.push(getPlainTextFromNode(child));
  });

  const [getTitle, getSubTitle] = getExtractText(textList);

  return [getTitle, getSubTitle, imageList];
};
