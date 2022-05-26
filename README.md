# UP42 assignment

# About

The task was to write workflow related tests against the UP42's API, of which info can be found [here](https://docs.up42.com/developers/api)

## Project structure

- Tests can be found in `/tests/api/`
- Custom fixture for authorising requests is found in `/tests/fixtures/`
- Both `/tests/config/` and `/tests/support/` folders contain helper functions, test data, constant values etc.

## Prerequisites

- [Node.js](https://nodejs.org/en/) **version 14** or higher installed.
- Please look at `.env.example` file and create a `.env` file with valid credentials

## Installation

```shell
yarn install
```

### Run the tests

```shell
yarn test
```

### Room for improvement

- making the workflow helper functions generic and passing different payloads to the requests, the task was about the specific blocks so I did not do this but it could be easily modified if needed
- I've added some basic assertions for the responses, however ideally this would be tested against an API schema
