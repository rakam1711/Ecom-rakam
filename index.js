require("dotenv").config();
const mongoose = require("mongoose");
const connectToDatabase = require("./dbconnection/connection.js");
const app = require("./src/app");
const scripts = require("./src/scripts/index.js");
const cluster = require("cluster");
const os = require("os");

const { PORT, BASE_URL } = process.env;

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.id} exited`);
    cluster.fork();
  });
} else {
  startServer();
}

async function startServer() {
  try {
    console.log("Initializing server");
    await connectToDatabase();
    await scripts();
    app
      .listen(PORT, () => console.log(`Server is running on ${BASE_URL}`))
      .on("error", shutdown);
  } catch (error) {
    shutdown(error);
  }
}


// (async () => {
//   try {
//     console.log("Initializing server");
//     await connectToDatabase();
//     await scripts();
//     app
//       .listen(PORT, () => console.log(`Server is running on ${BASE_URL}`))
//       .on("error", shutdown);
//   } catch (error) {
//     shutdown(error);
//   }
// })();

async function shutdown(err) {
  console.log("Unable to initialize the server:", err.message);
  await mongoose.connection.close();
  process.exit(1);
}
