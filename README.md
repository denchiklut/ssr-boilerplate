# SSR Boilerplate

[![license](https://img.shields.io/github/license/nhn/tui.editor.svg)](https://github.com/nhn/tui.editor/blob/master/LICENSE) [![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/nhn/tui.editor/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)

You can use this project as a boilerplate for your SSR applications. Feel free to suggest improvements

## Features

-   [x] `SSR`
-   [x] `HMR`
-   [x] Code splitting
-   [x] `SPA` mode
-   [x] `Polyfills`
-   [x] `PWA`

## Startup project

### Step 1. Project setup

Before starting work with the project, run the command:

```
yarn install
```

### Step 2. Environment variables

Add `.env` file based on `.env.example`

#### Adding new `env` variable

1. Add it to `.env` file
2. Add it\`s name to `@types/env/index.d.ts` (for TS)
3. If this variable needs to be accessible from both `client` & `server` add it\`s name to
   `setEnvVars` function in `common/env/env.util`
4. You can access this variable via `getEnvVars` function.
   This function will return a proper value based on environment & log a message if variable is not defined.

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
