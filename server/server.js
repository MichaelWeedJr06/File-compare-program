const express = require("express");

const app = express();
const PORT = 3000;
const path = require("path");

app.get("/", (req, res) => {
  const options = {
    root: path.join(
      "C:\\Users\\CMP_MiWeed\\Documents\\File compare program\\html"
    ),
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
