import { DataStoreServiceClient } from "@google-cloud/discoveryengine";
import { project, location, collection, dataStoreId } from "../utils/loadEnv";

type IndustryVertical =
  | "GENERIC"
  | "INDUSTRY_VERTICAL_UNSPECIFIED"
  | "MEDIA"
  | "HEALTHCARE_FHIR";

type ContentConfig = "CONTENT_REQUIRED" | "CONTENT_CONFIG_UNSPECIFIED";

/**
 * This snippet has been automatically generated and should be regarded as a code template only.
 * It will require modifications to work.
 * It may require correct/in-range values for request initialization.
 * TODO(developer): Uncomment these variables before running the sample.
 */
/**
 *  Required. The parent resource name, such as
 *  `projects/{project}/locations/{location}/collections/{collection}`.
 */
const parent = `projects/${project}/locations/${location}/collections/${collection}`;
/**
 *  Required. The DataStore google.cloud.discoveryengine.v1.DataStore  to
 *  create.
 */
const dataStore = {
  displayName: dataStoreId,
  industryVertical: "GENERIC" as IndustryVertical,
  contentConfig: "CONTENT_REQUIRED" as ContentConfig,
};
/**
 *  Required. The ID to use for the
 *  DataStore google.cloud.discoveryengine.v1.DataStore, which will become
 *  the final component of the
 *  DataStore google.cloud.discoveryengine.v1.DataStore's resource name.
 *  This field must conform to RFC-1034 (https://tools.ietf.org/html/rfc1034)
 *  standard with a length limit of 63 characters. Otherwise, an
 *  INVALID_ARGUMENT error is returned.
 */
// const dataStoreId = "abc123";
/**
 *  A boolean flag indicating whether user want to directly create an advanced
 *  data store for site search.
 *  If the data store is not configured as site
 *  search (GENERIC vertical and PUBLIC_WEBSITE content_config), this flag will
 *  be ignored.
 */
const createAdvancedSiteSearch = true;
/**
 *  A boolean flag indicating whether to skip the default schema creation for
 *  the data store. Only enable this flag if you are certain that the default
 *  schema is incompatible with your use case.
 *  If set to true, you must manually create a schema for the data store before
 *  any documents can be ingested.
 *  This flag cannot be specified if `data_store.starting_schema` is specified.
 */
const skipDefaultSchemaCreation = true;

// Instantiates a client
const discoveryengineClient = new DataStoreServiceClient();

async function callCreateDataStore() {
  // Construct request
  const request = {
    parent,
    dataStore,
    dataStoreId,
  };

  // Run request
  const [operation] = await discoveryengineClient.createDataStore(request);
  const [response] = await operation.promise();
  console.log(response);
}

callCreateDataStore();
