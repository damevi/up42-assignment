import { APIResponse } from "@playwright/test";
import { test, expect } from "@fixtures/auth";

import * as HTTP_CODE from "@config/httpStatuses";
import {
  JOBS_ENDPOINT,
  PROJECTS_ENDPOINT,
  WORKFLOW_ENDPOINT,
} from "@config/endpoints";

import { addWorkflowTasks, createNewWorkflow } from "@support/utils";
import {
  JOB_DETAILS,
  NEW_WORKFLOW_DATA,
  WORKFLOW_TASKS,
} from "@support/test_data";
import { JOB_STATUS } from "@config/jobs";

test.describe("Worfklows", () => {
  let currentWorkflow: APIResponse;
  let currentWorkflowId: string;

  test.beforeEach(async ({ context }) => {
    currentWorkflow = await createNewWorkflow(context);
    const { data } = await currentWorkflow.json();
    currentWorkflowId = data.id;
  });

  test("Creates a workflow", async () => {
    expect(currentWorkflow.status()).toEqual(HTTP_CODE.OK);
    const { data } = await currentWorkflow.json();
    expect(data).toMatchObject(NEW_WORKFLOW_DATA);
  });

  test("Adds workflow tasks", async ({ context }) => {
    const res = await addWorkflowTasks(context, currentWorkflowId);
    expect(res.status()).toEqual(HTTP_CODE.OK);
    const { data } = await res.json();

    expect(data).toHaveLength(2);
    WORKFLOW_TASKS.forEach((task, i) => {
      expect(data[i].name).toEqual(task.name);
      expect(data[i].block.id).toEqual(task.blockId);
    });
  });

  test("successfully runs a job", async ({ context }) => {
    await addWorkflowTasks(context, currentWorkflowId);

    const createJobEndpoint = `${WORKFLOW_ENDPOINT}/${currentWorkflowId}${JOBS_ENDPOINT}`;
    const createJobResponse = await context.request.post(createJobEndpoint, {
      data: JOB_DETAILS,
    });

    expect(createJobResponse.status()).toEqual(HTTP_CODE.OK);

    let { data } = await createJobResponse.json();
    const jobId = data.id;

    expect(data.status).toEqual(JOB_STATUS.NOT_STARTED);
    expect(data.inputs).toEqual(JOB_DETAILS);

    const getJobEndpoint = `${PROJECTS_ENDPOINT}${JOBS_ENDPOINT}/${jobId}`;
    await expect
      .poll(
        async () => {
          const res = await context.request.get(getJobEndpoint);
          const { data } = await res.json();

          return data.status;
        },
        {
          message: "waiting for job to be finished",
          intervals: [90_000, 30_000, 10_000, 10_000, 10_000],
          timeout: 150_000,
        }
      )
      .toEqual(JOB_STATUS.SUCCEEDED);
  });

  test.afterEach(async ({ context }) => {
    const res = await context.request.delete(
      `${WORKFLOW_ENDPOINT}/${currentWorkflowId}`
    );

    expect(res.ok()).toBeTruthy();
  });
});
