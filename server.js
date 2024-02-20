
> start
> concurrently --kill-others-on-fail "npm run server"

[0] 
[0] > server
[0] > cd server && nodemon server
[0] 
[0] [33m[nodemon] 3.0.3[39m
[0] [33m[nodemon] to restart at any time, enter `rs`[39m
[0] [33m[nodemon] watching path(s): *.*[39m
[0] [33m[nodemon] watching extensions: js,mjs,cjs,json[39m
[0] [32m[nodemon] starting `node server.js`[39m
[0] node:internal/modules/cjs/loader:1152
[0]   throw err;
[0]   ^
[0] 
[0] Error: Cannot find module 'express'
[0] Require stack:
[0] - /home/ubuntu/aria-back-end/server/server.js
[0]     at Module._resolveFilename (node:internal/modules/cjs/loader:1149:15)
[0]     at Module._load (node:internal/modules/cjs/loader:990:27)
[0]     at Module.require (node:internal/modules/cjs/loader:1237:19)
[0]     at require (node:internal/modules/helpers:176:18)
[0]     at Object.<anonymous> (/home/ubuntu/aria-back-end/server/server.js:1:17)
[0]     at Module._compile (node:internal/modules/cjs/loader:1378:14)
[0]     at Module._extensions..js (node:internal/modules/cjs/loader:1437:10)
[0]     at Module.load (node:internal/modules/cjs/loader:1212:32)
[0]     at Module._load (node:internal/modules/cjs/loader:1028:12)
[0]     at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:142:12) {
[0]   code: 'MODULE_NOT_FOUND',
[0]   requireStack: [ '/home/ubuntu/aria-back-end/server/server.js' ]
[0] }
[0] 
[0] Node.js v21.6.2
[0] [31m[nodemon] app crashed - waiting for file changes before starting...[39m
[0] npm run server exited with code SIGTERM
