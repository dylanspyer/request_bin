const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello!");
});

// create a random webhook token to be used as an endpoint
app.post('/api/generateWebhookToken', (req, res) => {
  // todo: create function to generate unique end point
  // testing endpoint
  let generateWebhookToken = 'testwebhooktoken'
  
  console.log(`generateWebhookToken ${generateWebhookToken}`)
  
  res.status(200).send(generateWebhookToken)
})

// catch all for recording a webhook trigger of any request type
app.all('/api/request/:webhookToken', (req, res) => {
  const webhookToken = req.params.webhookToken
  
  console.log(req.headers)
  console.log(req.body)
  console.log(req.method)
  console.log(`webhookToken ${webhookToken}`)

  res.status(200).send('test')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
