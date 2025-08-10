const express = require("express");
const sendEmail = require("./path/to/your/sendEmail");
const app = express();

app.use(express.json());

app.post("/api/contact", sendEmail);

app.listen(3000, () => console.log("Server running on port 3000"));
