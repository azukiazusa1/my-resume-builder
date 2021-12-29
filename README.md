# My Resume Builder

## Demo

### View storybook

https://azukiazusa1.github.io/my-resume-builder/

## Requirement

- Node.js 14.17.4
- Yarn 1.22.11

## Setup

### Install

```bash
yarn
```

## Copy .env.example to .env.local

```bash
cp .env.example .env.local
```

### Run the development server

```bash
yarn dev
# or
yarn dev:mock # enable mock server by msw
```

### Test

```bash
yarn test:watch
```

### Lint

```bash
yarn lint:fix
yarn format
```

### Starts Storybook in development mode

```bash
yarn storybook
```

### Use the authentication function

1. Set up Google OAuth 2.0 https://support.google.com/cloud/answer/6158849?hl=en
2. Then, Copy the client ID and client secret to the .env.local file

```
GOOGLE_CLIENT_ID= // client id here...
GOOGLE_CLIENT_SECRET= // client secret here...
```

3. Create a valid secret on the command line via this openssl command.

```bash
openssl rand -base64 32
```

4. Set `SERCRET` to .env.local file

```
SECRET=
```

## Authors

- [azukiazusa1](https://github.com/azukiazusa1)
