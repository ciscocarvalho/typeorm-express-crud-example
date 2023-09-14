require("dotenv").config()
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const publicFolder = path.join(__dirname, "..", "public")
app.use(express.static(path.join(publicFolder)));
app.use(express.static(path.join(publicFolder, "pages")));

app.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});
