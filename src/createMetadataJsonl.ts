import * as fs from "fs";
import { gcsMediaFolderUrl } from "./utils/loadEnv";

// サンプルデータ
const data = [
  {
    id: "example",
    structData: {
      name: "質問とクエリパラメータの対応例",
      description: "質問とそれに対するクエリパラメータの対応例",
    },
    content: {
      mimeType: "text/plain",
      uri: `${gcsMediaFolderUrl}/example.txt`,
    },
  },
  {
    id: "lookml_metadata",
    structData: {
      name: "LookMLメタデータ",
      description: "クエリパラメータに用いるフィールドのメタデータ",
    },
    content: {
      mimeType: "text/plain",
      uri: `${gcsMediaFolderUrl}/lookml_metadata.txt`,
    },
  },
  {
    id: "format",
    structData: {
      name: "出力フォーマット",
      description: "回答として出力されるJSONLフォーマット",
    },
    content: {
      mimeType: "text/plain",
      uri: `${gcsMediaFolderUrl}/format.txt`,
    },
  },
  {
    id: "context",
    structData: {
      name: "コンテキスト",
      description: "Geminiに対する指示のコンテキスト情報",
    },
    content: {
      mimeType: "text/plain",
      uri: `${gcsMediaFolderUrl}/context.txt`,
    },
  },
];

const filePath = "sample/metadata.jsonl";

// JSONLファイルを作成する関数
function createJsonlFile(data: any[], filePath: string) {
  // ファイルを空にする、または新規作成
  fs.writeFileSync(filePath, "");

  // 各オブジェクトをJSON文字列に変換し、ファイルに追記
  data.forEach((item) => {
    const jsonString = JSON.stringify(item) + "\n";
    fs.appendFileSync(filePath, jsonString);
  });

  console.log(`JSONLファイルが作成されました: ${filePath}`);
}

// 関数を呼び出してJSONLファイルを作成
createJsonlFile(data, filePath);
