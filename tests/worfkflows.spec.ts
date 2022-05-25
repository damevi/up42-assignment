import { APIResponse } from "@playwright/test";
import { test, expect } from "./fixtures/auth";

import { TASKS_ENDPOINT, WORKFLOW_ENDPOINT } from "./config/endpoints";

import { createNewWorkflow } from "./support/utilts";
import { NEW_WORKFLOW_DATA, WORKFLOW_TASKS } from "./support/test_data";


test.describe("Worfklows", () => {
  let currentWorkflow: APIResponse;
  let currentWorkflowId: string;

  test.beforeEach(async ({ context }) => {
    currentWorkflow = await createNewWorkflow(context);
    const { data } = await currentWorkflow.json();
    currentWorkflowId = data.id;
  });

  test("Creates a workflow", async () => {
    expect(currentWorkflow.ok()).toBeTruthy();
    const { data } = await currentWorkflow.json();
    expect(data).toMatchObject(NEW_WORKFLOW_DATA);
  });

  test("Adds workflow tasks", async ({ context }) => {
    const tasksEndpoint = `${WORKFLOW_ENDPOINT}/${currentWorkflowId}${TASKS_ENDPOINT}`;

    const res = await context.request.post(tasksEndpoint, {
      data: WORKFLOW_TASKS,
    });

    expect(res.ok()).toBeTruthy();
  });

  test.afterEach(async ({ context }) => {
    const res = await context.request.delete(
      `${WORKFLOW_ENDPOINT}/${currentWorkflowId}`
    );

    expect(res.ok()).toBeTruthy();
  });
});
