# SSR Boilerplate

[![license](https://img.shields.io/github/license/nhn/tui.editor.svg)](https://github.com/nhn/tui.editor/blob/master/LICENSE) [![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/nhn/tui.editor/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)

You can use this project as a boilerplate for your SSR applications. Feel free to suggest improvements
If you are looking for **renderToPipeableStream** setup switch to the [feat/pipable-stream](https://github.com/denchiklut/ssr-boilerplate/tree/feat/pipable-stream) branch

## Features

-   [x] `SSR`
-   [x] `HMR`
-   [x] Code splitting
-   [x] `SPA` mode
-   [x] `Polyfills`
-   [x] `PWA`
-   [x] local `https`

## Startup project

### Step 1. Project setup

Before starting work with the project, run the command:

```
yarn install
```

### Step 2. Https setup

If you need to use https, follow these steps:

1. in `setup.sh` change the `domain` variable to your domain
2. run the command `yarn setup`
3. finally add your HOST variable to .env file as `https://<YOUR-domain>:PORT`

### Step 2. Environment variables

You can use .env file to specify environment variables. This file is ignored by git.

#### Adding new `env` variable

1. Add it to `.env` file
2. For TS completion and validation add it to `envSchema` in `src/common/env/env.util.ts`
3. If this variable needs to be accessible from both `client` & `server` add it\`s name to
   `setEnvVars` function in `common/env/env.util`
4. You can access environment variable via `getENV` function.
   This function will return a proper value based on environment (client/server) and cast it to a proper type based on `envSchema` from `step 2` (string/number/boolean)

#### Global variables

Note that additionally there will be few useful `global variables` available for you.

-   `IS_DEV`, `IS_PROD`, `IS_SERVER`, `IS_SPA`

### Step 3. Starting the project

To start the project in **SSR** mode, run the command

```
yarn dev
```

To start the project in **SPA** mode, run the command

```
yarn spa
```

To start the project in **Prod** mode, run the command

```
yarn start
```

Ready! The app will start on `http://localhost:3000`
