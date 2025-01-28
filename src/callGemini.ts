const { VertexAI } = require("@google-cloud/vertexai");
import {
  project,
  dataStoreId,
  collection,
} from "./utils/loadEnv";

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({
  project: project,
  location: "asia-northeast1",
});
const model = "gemini-1.5-flash-001";

// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: {
    maxOutputTokens: 8192,
    temperature: 0.1,
    topP: 0.95,
    seed: 0,
  },
  safetySettings: [
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "OFF",
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "OFF",
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "OFF",
    },
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "OFF",
    },
  ],
  tools: [
    {
      retrieval: {
        vertexAiSearch: {
          datastore:
            `projects/${project}/locations/global/collections/${collection}/dataStores/${dataStoreId}`,
        },
      },
    },
  ],
});

async function generateContent() {
  const req = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `
Context
----------
あなたはLookerに対するクエリを指示する文章を、Looker SDKで適用可能なパラメータに変換する役割を持っています。
以下の条件に従って回答を出力してください。
条件:
- 回答の対象となるユーザーからの質問は Input を参照してください
- 回答は Output に続く形で出力してください
- 回答は format.txt に従った JSONL 形式の文字列で出力してください
- クエリパラメータに用いるフィールドは lookml_metadata.txt を参考にしてください
- 質問とそれに対するクエリパラメータの例として example.txt を参考にしてください
- 回答の content にクエリの要約文章を挿入してください

Input
----------
ブランドごとの注文数トップ50を棒グラフで可視化してください

Output
----------
    `,
          },
        ],
      },
    ],
  };

  const streamingResp = await generativeModel.generateContentStream(req);

  for await (const item of streamingResp.stream) {
    process.stdout.write("stream chunk: " + JSON.stringify(item) + "\n");
  }

  process.stdout.write(
    "aggregated response: " + JSON.stringify(await streamingResp.response)
  );
}

generateContent();
