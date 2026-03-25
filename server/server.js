const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
//const bodyParser = require("body-parser");
// // using body-parser middleware
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join("*")))
// app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  let p = path.join(__dirname, "../public/html");
  const options = {
    root: p,
  };
  const fileName = "index.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error("Error sending file: ", err);
    } else {
      console.log("Sent: ", fileName);
    }
  });
});
const {Main} = require("../main");
app.post("/submit", async (req, res) => {
  const { link1, link2 } = req.body;
  const links = [link1, link2];
  const result = await Main(links);
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
