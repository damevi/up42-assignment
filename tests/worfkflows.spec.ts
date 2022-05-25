import { WORKFLOW_ENDPOINT } from "./config/endpoints";
import { test, expect } from "./fixtures/auth";

test.describe("Worfklows", () => {
  let workflowId: string;

  test("Creates a workflow", async ({ context }) => {
    const req = {
      name: "QA coding challenge workflow",
      description: "Workflow description",
    };

    const newWorkflow = await context.request.post(WORKFLOW_ENDPOINT, {
      data: req,
    });
    expect(newWorkflow.ok()).toBeTruthy();

    const { data } = await newWorkflow.json();
    workflowId = data.id;

    expect(data).toMatchObject(req);
  });

  test.afterEach(async ({ context }) => {
    console.log("ID", workflowId);
    const resp = await context.request.delete(
      `${WORKFLOW_ENDPOINT}/${workflowId}`
    );

    expect(resp.ok()).toBeTruthy();
  });
});
