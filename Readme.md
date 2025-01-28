# Geminiのグラウンディング検証

## グラウンディングの適用方法

グラウンディングを適用するには以下のことが必要
- Vertex AI Searchのデータストア作成
- データストアにドキュメントをインポート
  - 構造化データ（JSONL形式）
    - 取り込み時のスキーマは自動推測or指定可能
  - 非構造化データ（TXT, PDF, HTML）
    - メタデータファイルを別途使用可能
  - ウェブコンテンツ（URLを指定）
- Gemini呼び出しでデータストアを指定して呼び出し

グラウンディングは以下の制限あり？（調査中）
- 1データストアあたり1スキーマのみ指定可能？
- Gemini呼び出しにつき1データストアのみ指定可能？

# 事前セットアップ

## ライブラリのインストールと、gcloud login

```
npm i
gcloud auth application-default login
```

## Google Cloudコンソールでの設定

- Discovery Engine APIの有効化
- Vertex AI APIの有効化
- sampleのデータを保存するGCSバケットの作成（名称等は好みで）
- Vertex AI Searchデータストアの作成

## .envの設定

- 設定すること
  - プロジェクトID
  - データストア用ロケーション（通常global）
  - データストアID（名称じゃない）

# データストアの作成

```
npx ts-node src/createDatastore.ts
```

# データストアにデータをインポート(GCS)

事前にGCSバケットにサンプル用のJSONLをアップロードしておくこと

データのスキーマはSDK呼び出し時のオプションから自動的に読み取るかどうかが設定可能
詳細は以下のURL参照
https://cloud.google.com/generative-ai-app-builder/docs/create-data-store-es?hl=ja#storage-import-once

```
npx ts-node src/createDocumentFromGcs.ts
```

# データストアにデータをインポート(BigQuery)

インポートするBQテーブルは自身で用意しておくこと

```
npx ts-node src/createDocumentFromBigQuery.ts
```

# Geminiの呼び出し

```
npx ts-node src/callGemini.ts
```