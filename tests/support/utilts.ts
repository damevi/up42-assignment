import { APIResponse, BrowserContext } from "@playwright/test";
import { WORKFLOW_ENDPOINT } from "../config/endpoints";
import { NEW_WORKFLOW_DATA } from "./test_data";

const createNewWorkflow = async (
  context: BrowserContext
): Promise<APIResponse> => {
  return await context.request.post(WORKFLOW_ENDPOINT, {
    data: NEW_WORKFLOW_DATA,
  });
};

export { createNewWorkflow };
