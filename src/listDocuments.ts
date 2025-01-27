import { DocumentServiceClient } from "@google-cloud/discoveryengine";
import {
  project,
  location,
  dataStoreId,
  collection,
  branch,
} from "./utils/loadEnv";

/**
 * This snippet has been automatically generated and should be regarded as a code template only.
 * It will require modifications to work.
 * It may require correct/in-range values for request initialization.
 * TODO(developer): Uncomment these variables before running the sample.
 */
/**
 *  Required. The parent branch resource name, such as
 *  `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}/branches/{branch}`.
 *  Use `default_branch` as the branch ID, to list documents under the default
 *  branch.
 *  If the caller does not have permission to list
 *  Document google.cloud.discoveryengine.v1.Document s under this branch,
 *  regardless of whether or not this branch exists, a `PERMISSION_DENIED`
 *  error is returned.
 */
const parent = `projects/${project}/locations/${location}/collections/${collection}/dataStores/${dataStoreId}/branches/${branch}`;
/**
 *  Maximum number of Document google.cloud.discoveryengine.v1.Document s to
 *  return. If unspecified, defaults to 100. The maximum allowed value is 1000.
 *  Values above 1000 are set to 1000.
 *  If this field is negative, an `INVALID_ARGUMENT` error is returned.
 */
// const pageSize = 1000;
/**
 *  A page token
 *  ListDocumentsResponse.next_page_token google.cloud.discoveryengine.v1.ListDocumentsResponse.next_page_token,
 *  received from a previous
 *  DocumentService.ListDocuments google.cloud.discoveryengine.v1.DocumentService.ListDocuments
 *  call. Provide this to retrieve the subsequent page.
 *  When paginating, all other parameters provided to
 *  DocumentService.ListDocuments google.cloud.discoveryengine.v1.DocumentService.ListDocuments
 *  must match the call that provided the page token. Otherwise, an
 *  `INVALID_ARGUMENT` error is returned.
 */
// const pageToken = 'abc123'

// Instantiates a client
const discoveryengineClient = new DocumentServiceClient();

async function callListDocuments() {
  // Construct request
  const request = {
    parent,
  };

  // Run request
  const iterable = discoveryengineClient.listDocumentsAsync(request);
  for await (const response of iterable) {
    console.log(response);
  }
}

callListDocuments();
