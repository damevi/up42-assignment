require("dotenv").config();

export const OAUTH_ENDPOINT = "/oauth/token";
export const WORKFLOW_ENDPOINT = `/projects/${process.env.PROJECT_ID}/workflows`;
export const TASKS_ENDPOINT = "/tasks";
