/// <reference path="./.sst/platform/config.d.ts" />\

import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

const ssm = new SSMClient({
  region: "us-east-2"
});

const getSSMParameter = async (name: string) => {
  const command = new GetParameterCommand({ Name: name, WithDecryption: true });
  const response = await ssm.send(command);
  return response.Parameter?.Value;
};

// In your SST config
const sstSecretKey = await getSSMParameter("/examples/sst/secretKey") ?? '';

export default $config({
  app(input) {
    return {
      name: "lemonpie",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          region: "us-east-2"
        }
      }
    };
  },
  async run() {
    const username = "admin";
    const password = "password";
    const basicAuth = Buffer.from(`${username}:${password}`).toString("base64");

    const docs = new sst.aws.React("MyDocs", {
      path: "apps/docs/",
      buildCommand: "pnpm run build",
      dev: {
        command: "pnpm run dev",
      },
      environment: {
        VITE_SECRET_KEY: sstSecretKey,
      },
      invalidation: {
        paths: "all",
        wait: true
      },
      edge: false,
      server: {
        runtime: "nodejs22.x",
        edge: {
          viewerRequest: {
            injection: $interpolate`
            if (
                !event.request.headers.authorization
                  || event.request.headers.authorization.value !== "Basic ${basicAuth}"
              ) {
              return {
                statusCode: 401,
                headers: {
                  "www-authenticate": { value: "Basic" }
                }
              };
            }`,
          },
        }
      }
    });

    return {
      docs
    };
  },
});
