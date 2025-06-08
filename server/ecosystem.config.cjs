export default {
  apps: [
    {
      name: "inventory-management",
      script: "pnpm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
        ENV_VAR1: "environment-variable",
      },
    },
  ],
};
