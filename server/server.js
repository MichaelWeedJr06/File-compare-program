const express = require("express");

const app = express();
const PORT = 3000;
const path = require("path");

app.get("/", (req, res) => {
  let p = path.join(__dirname);
  p = p.replace("\\server", "\\html");
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

app.post("/submit", (req, res) => {
  res.send("Submitted");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
