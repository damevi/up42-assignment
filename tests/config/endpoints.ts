require("dotenv").config();

export const OAUTH_ENDPOINT = "/oauth/token";
export const CREATE_WORKFLOW = `/projects/${process.env.PROJECT_ID}/workflows`;
