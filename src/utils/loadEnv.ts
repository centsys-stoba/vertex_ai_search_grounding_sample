import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const project = process.env.PROJECT_ID;
// Vertex AI Searchデータセット用
const location = process.env.VERTEX_AI_DATASTORE_LOCATION;
const dataStoreId = process.env.VERTEX_AI_DATASTORE_ID;
const collection = "default_collection"; // 固定値？
const branch = "default_branch"; // 固定値?

// データセットGCSインポート用
const gcsBucketInputUrl = process.env.GCS_BUCKET_INPUT_URL;

// データセットBigQueryインポート用
const datasetId = process.env.BIGQUERY_DATASET_ID;
const tableId = process.env.BIGQUERY_TABLE_ID;

export { project, location, dataStoreId, collection, branch, gcsBucketInputUrl, datasetId, tableId };
