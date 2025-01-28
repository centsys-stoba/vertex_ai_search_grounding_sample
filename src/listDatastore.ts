import { DataStoreServiceClient } from "@google-cloud/discoveryengine";
import { project, location, collection } from "./utils/loadEnv";

const parent = `projects/${project}/locations/${location}/collections/${collection}`;

// Instantiates a client
const discoveryengineClient = new DataStoreServiceClient();

async function callListDataStore() {
  // Construct request
  const request = {
    parent,
  };

  // Run request
  const response = await discoveryengineClient.listDataStores(request);
  console.log(response);
}

callListDataStore();
