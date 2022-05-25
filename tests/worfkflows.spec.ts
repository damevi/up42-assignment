import { CREATE_WORKFLOW } from "./config/endpoints";
import { test, expect } from "./fixtures/auth";

test.describe("Worfklows", () => {
  test("Creates workflow", async ({ context }) => {
    const newWorkflow = await context.request.post(CREATE_WORKFLOW, {
      data: {
        name: "QA coding challenge workflow",
        description: "Workflow description",
      },
    });

    expect(newWorkflow.ok()).toBeTruthy();
  });
});
