# Description

If you need to modify your `app.json` file frequently in a programmatic way, `app-json-prepare.js` helps you as a base.

It comes with an automatic way to keep track of build numbers. (Assure to keep `build-counter.txt` not touched.)

The `app-json-prepare.js` simply loads the existing `app.json` as the base. And you add required automated changes within the code. After that it overwrites the final state off `app.json`. **Caution: Be informed that old `app.json` is lost, use the method consciously.**

# Usage

Just copy app-json-prepare.js into your repo. And within this file do the needed modifications for your `app.json` file.

Before your builds run:
```
node app-json-prepare.js
```


