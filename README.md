<p align="center">
  <img src ="./docs/repo-header.gif" />
</p>

**[Live example](https://rawgit.com/hackhat/tic-tac-toe-flux/v0.0.2/dist/index.html)**

This is just a simple tic tac toe game using the flux architecture and react view engine.

## Running your project

The generated project includes a live-reloading static server on port `8080` (you can change the port in the `gulpfile.js` config), which will build, launch, and rebuild the app whenever you change application code. To start the server, run:

```bash
$ npm start
```

If you want to run on a certain host run with `npm run dev --host=192.168.1.70`;

If you prefer to just build without the live reload and build-on-each-change watcher, run:

```bash
$ npm run build
```

To test run:

```bash
$ npm run test
```

## Generating Additional Code

You can add additional functionality to your application by invoking the subgenerators included in the Flux Generator. You can add components using the following commands:

#### Components
```bash
$ yo flux:component ComponentName
```

#### Actions
```bash
$ yo flux:action ActionCreatorName
```

#### Stores
```bash
$ yo flux:store StoreName
```
