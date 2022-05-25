import { APIResponse, BrowserContext } from "@playwright/test";
import { TASKS_ENDPOINT, WORKFLOW_ENDPOINT } from "@config/endpoints";
import { NEW_WORKFLOW_DATA, WORKFLOW_TASKS } from "@support/test_data";

const createNewWorkflow = async (
  context: BrowserContext
): Promise<APIResponse> => {
  return await context.request.post(WORKFLOW_ENDPOINT, {
    data: NEW_WORKFLOW_DATA,
  });
};

const addWorkflowTasks = async (
  context: BrowserContext,
  workflowId: string
): Promise<APIResponse> => {
  const tasksEndpoint = `${WORKFLOW_ENDPOINT}/${workflowId}${TASKS_ENDPOINT}`;

  return await context.request.post(tasksEndpoint, {
    data: WORKFLOW_TASKS,
  });
};

export { createNewWorkflow, addWorkflowTasks };
