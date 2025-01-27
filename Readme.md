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