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
-   [x] React forget
-   [x] local `https`
-   [x] `PipeableStream` support

### SSR Suspense

-   If you want to try React 18's SSR Suspense api such as `renderToPipeableStream`, switch to the [feat/pipable-stream](https://github.com/denchiklut/ssr-boilerplate/tree/feat/pipable-stream) branch.
-   Also, there is en example for setting up suspense api with CSS-in-JS library in our case [MUI](https://github.com/denchiklut/ssr-boilerplate/tree/feat/suspense-mui) just switch to the [feat/suspense-mui](https://github.com/denchiklut/ssr-boilerplate/tree/feat/suspense-mui) branch.
-   I also wrote a small article about `SSR with React 18`. For those interested in further information, feel free to check my [post on medium](https://medium.com/@ollylut/ssr-with-react-18-c8961d764a94)

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
2. For TS completion and validation add it to `envSchema` in `src/common/env/index.ts`
3. If this variable needs to be accessible from both `client` & `server` make sure it's name starts with prefix `CLIENT_`
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
