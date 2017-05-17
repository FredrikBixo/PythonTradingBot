#Stock Picker web interface
This is the web interface for the stock picker.

Build frontend production with
```
NODE_ENV=production BUILD_TARGET=browser SERVICE_URL=http://localhost:3000/ node_modules/.bin/webpack -p
```

Build frontend development with
```
NODE_ENV=development BUILD_TARGET=browser SERVICE_URL=http://localhost:3000/ node_modules/.bin/webpack -d
```

Run webpack dev-server with:

```
node_modules/.bin/http-server src/static
```

Run express server with:
```
NODE_ENV=production BUILD_TARGET=server SERVICE_URL=http://localhost:3000/ MYSQL_PASS=Supermeio2000! node_modules/.bin/babel-node --presets react,es2015,stage-0 src/server.js
```

```
NODE_ENV=development BUILD_TARGET=server SERVICE_URL=http://localhost:3000/ MYSQL_PASS=Supermeio2000! node_modules/.bin/babel-node --presets react,es2015,stage-0 src/server.js
```
