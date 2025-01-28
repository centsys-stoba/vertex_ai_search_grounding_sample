# Geminiのグラウンディング検証

ここでは非構造化データのTXTファイルのデータストアを作成し、Geminiのグラウンディングを行う例を示す。

## グラウンディングの適用方法の概要

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

# 非構造化TXTデータによる実験

実験では以下の操作を行う。
- GCコンソールで各種設定
- .env更新
- データストア作成
- TXTファイルのGCSアップロード
- データストアへのTXTファイルインポート
- Gemini呼び出し

## 事前セットアップ

### ライブラリのインストールと、gcloud login

```
npm i
gcloud auth application-default login
```

### Google Cloudコンソールでの設定

- Discovery Engine APIの有効化
- Vertex AI APIの有効化
- sampleのデータを保存するGCSバケットの作成（名称等は好みで）
- Vertex AI Searchデータストアの作成

### .envの設定

- 設定すること
  - プロジェクトID
  - データストア用ロケーション（通常global）
  - データストアID
  - TXTファイル配置用のフォルダのGCSパス
  - メタデータファイルのGCSパス

## データストアの作成

```
npx ts-node src/unstructured/createDatastore.ts
```

## メタデータJSONLの作成

```
npx ts-node src/unstructured/createMetadataJsonl.ts
```

## ファイルアップロード

Google Cloudコンソールで以下のファイルをアップロードする。
なお、TXTファイルは同一のフォルダに配置する必要があるが、メタデータ.jsonlは別のフォルダでも可能。

- sample/media/*.txt
- sample/metadata.jsonl

## データストアにデータをインポート(GCS)

```
npx ts-node src/unstructured/createDocumentFromGcs.ts
```

## Geminiの呼び出し

```
npx ts-node src/callGemini.ts
```