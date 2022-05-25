require("dotenv").config();

export const OAUTH_ENDPOINT = "/oauth/token";
export const PROJECTS_ENDPOINT = `/projects/${process.env.PROJECT_ID}`;
export const WORKFLOW_ENDPOINT = `${PROJECTS_ENDPOINT}/workflows`;
export const TASKS_ENDPOINT = "/tasks";
export const JOBS_ENDPOINT = `/jobs`;
