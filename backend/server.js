require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");

const { generateInterviewReport } = require("./src/services/ai.service");
const { resume, selfDescription, JD } = require("./src/services/temp");

connectDB();
generateInterviewReport({resume, JD, selfDescription});

app.listen(process.env.PORT, () => {
  console.log(`Server is running`);
});
