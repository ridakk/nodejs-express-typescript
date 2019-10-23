# minimal NodeJs Express starter with TypeScript

[![Build Status](https://travis-ci.org/ridakk/nodejs-express-typescript.svg?branch=master)](https://travis-ci.org/ridakk/nodejs-express-typescript)
[![Coverage Status](https://coveralls.io/repos/github/ridakk/nodejs-express-typescript/badge.svg?branch=master)](https://coveralls.io/github/ridakk/nodejs-express-typescript?branch=master)
![David](https://img.shields.io/david/ridakk/nodejs-express-typescript)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/ridakk/nodejs-express-typescript)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Usage (quick start)

 1. clone the repo
 2. `npm install`
 3. Setup temp environment configs (TEST only)
    * RUN in CLI from project root `./setenv.sh` if you have bash compatible cli
    * OR create `.env` file manually
 4. Make note of generated files and change to your preferences
    * IMPORTANT: when deploying app, don't use the `.env` file, simply set vars in your CI provider or container manager
 5. Run eslint
    * `npm run lint`
 6. Run tests (will load up test data in tables)
    * `npm run test`
 7. Run coverage (will load up test data in tables)
    * `npm run coverage`
    * see results from `coverage/lcov-report/index.html`
 8. Start up app in developer mode (will watch and recompile for changes)
    * `npm run dev`
 9. Start up app in production mode (will watch and recompile for changes)
    * `npm run build`
    ? `npm start`
 10. Open browser tab to [Swagger UI Explorer](http://localhost:8000/api-docs) to explore API

## Api Documentation

Used [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) for generating [Swagger](https://swagger.io/) using [JSDoc](https://jsdoc.app/) comments in code.

See [test route](./routes/test/test.route.ts) for a simple usage example.

## Configuration Management

Deployment specific hierarchical configurations are maintained with [config](https://www.npmjs.com/package/config) module.

To add a system wide configuration parameter, update `./config/default.yaml`.
To add/update an environment or deployment specific configuration parameter, update for ex: `./production.yaml`

***IMPORTANT: do NOT put critical parameters like keys/passwords in configuration files, and use `.env` file described below.***

## Environment Variables

RUN in CLI from project root `./setenv.sh` if you have bash compatible cli, if not create an `.env` file accordingly to the script.
Make note of generated files and change to your preferences
***IMPORTANT: when deploying app, don't use the `.env` file, simply set vars in your CI provider or container manager***

adding a new environment variable:
1- update `./setenv.sh` and add a default value
2- update `./env/validators.ts` to validate the value

```ts
import { str } from 'envalid';

export default {
  // put env validations here
  // Envalid parses NODE_ENV automatically, so no need to put it here
  DUMMY: str(),
};
```

And you can use the env variable as below;

```js
import env from  './env';

console.log(env.DUMMY);
```

## Logging

[Pino](https://www.npmjs.com/package/pino) is used as a logging library in combination with [express pino logger](https://www.npmjs.com/package/express-pino-logger) and [pino pretty](https://www.npmjs.com/package/pino-pretty)

See [logger](utils/logger) for a basic pino configuration.

## Testing

This demo app includes automated tests using [supertest](https://www.npmjs.com/package/supertest) and [jest](https://www.npmjs.com/package/jest) to test routes, etc.

See [example](./routes/test/test.route.test.ts) for a simple test route.

## Commit guideline

This repo is Commitizen-friendly and using use [AngularJS's commit message](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines) convention also known as [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog).

To use Commitizen command line interface:

```bash
npm run cm
```

For validating commit message format for users using `git commit`, [commitlint](https://commitlint.js.org/#/) is used to check if the commit messages meet the conventional commit format.
