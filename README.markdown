# May Is Bike Month

**NOTE: Handling the leaderboard via a static site doesn't work.**

There isn't enough information available, without getting individual user's Strava data.

See [PR#6](https://github.com/MayIsBikeMonth/MayIsBikeMonth.github.io/pull/6) for more information on the attempt.

---

Automatically generate leaderboard for May Is Bike Month

**[mayisbikemonth.github.io](https://mayisbikemonth.github.io/)**

---
## Development

View the current version of requirements in [.tool-versions](.tool-versions) (the [asdf](https://asdf-vm.com/) version management file).

Copy the `.env.example` file to `.env` and fill in the values.

<!--

_I don't think including this separately is necessary anymore, since we'll either be testing or running the webpage_

Watch for changes and recompile the typescript with:

```sh
npx tsc --watch
```

-->

### Tests

Run the tests with:

```sh
npm run test:watch
```

Setting `DOTENV=false` will skip loading the `.env` file (useful for CI).

### The webpage (hosted via github pages)

The webpage is a static site.

Run the site locally with:

```sh
npm run start
```

This uses [lite-server](https://github.com/johnpapa/lite-server) to serve the static files and handles live-reload.

It uses [node-foreman](https://github.com/strongloop/node-foreman) to run the server and the typescript compiler in parallel.
