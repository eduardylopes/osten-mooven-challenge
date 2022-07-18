## Nest.js App (back-end)

### Install the dependencies

```bash
$ npm install
```

### SQLite Database: No server is required to use a SQLite database, so you can just add an environment variable point it to a local file which in this case is called dev.db

### Configure environment variables at .env file.

```bash
DATABASE_URL="file:./dev.db"
```

### Running the app

```bash
# watch mode
$ npm run start:dev

```

## Quasar App (front-end)

### Install the Quasar CLI (Recommended)

```bash
$ npm i -g @quasar/cli
```

### Install the dependencies

```bash
$ npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
$ quasar dev
```

## Test this API in insomnia

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Osten%20Mooven%20Challenge&uri=https%3A%2F%2Fgithub.com%2Feduardylopes%2Fosten-mooven-challenge%2Fblob%2Fmaster%2Fback-end%2Ftsconfig.json)
