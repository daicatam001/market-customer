const express = require("express"),
  serveStatic = require("serve-static"),
  history = require("connect-history-api-fallback"),
  cors = require('cors')
  port = process.env.PORT || 5000;

const app = express();

app.use(history());
app.use(
  cors({
    origin: "http://viet5g.com:8081",
  })
);
app.use(serveStatic(__dirname + "/dist/market-customer"));
app.listen(port,()=>{
    console.log('app running')
});
