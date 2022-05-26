import { test as base } from "@playwright/test";
import { OAUTH_ENDPOINT } from "../config/endpoints";

require("dotenv").config();

const authUrl = `https://${process.env.PROJECT_ID}:${process.env.PROJECT_API_KEY}@api.up42.com${OAUTH_ENDPOINT}`;

export const test = base.extend({
  context: async ({ request, context }, use) => {
    const resp = await request.post(authUrl, {
      form: {
        grant_type: "client_credentials",
      },
    });
    const { access_token } = await resp.json();

    await context.setExtraHTTPHeaders({
      Authorization: `Bearer ${access_token}`,
    });
    await use(context);
  },
});

export { expect } from "@playwright/test";
