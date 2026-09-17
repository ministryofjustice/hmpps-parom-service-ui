# AGENTS.md

## Project Architecture
This is the PAROM Service frontend application, which serves as a frontend for creating PAROM report documents.

The application is a Node.js application using the Express framework. It is written in TypeScript and
uses Nunjucks for server-side rendering of HTML templates.

The application interacts with several services:
 - **Parom API**: This is the backend API that the frontend communicates with to fetch and submit data.
 - **NDelius Integration Service**: This service is used to fetch offender details from the NDelius system.
 - **Probation Access Control**: This service is used to check whether a user has limited access to a
   particular offender's record.

## Agent Execution Rules
- After each change, run `npm run lint` to check linting errors and
`npm run lint-fix` to automatically fix them.

- To run the integration tests, first ensure that WireMock is running and the app is running using
`npm run start-feature`. Then run `npm run int-test`.
You may need to find the pid of the app server to kill it manually after testing is complete.

## Worktree Setup Rules
- Do not commit changes when a task is done, leave that to the user.
- After creating or modifying files in a worktree, ensure a symlink to the root `.env` exists
- Testing may require removing the role requirement in the `authorisationMiddleware` in `server/app.ts`.
- Ensure changes are linted and typechecked at the end of a task. If running the integration tests, be aware that parallel
agents may also be attempting to run the tests and have their own app server running, or may have made changes to WireMock.
  - It may be best to let the fleet coordinator run the tests after each agent has completed their work.
- Unless specifically asked for, do not create new test files.
