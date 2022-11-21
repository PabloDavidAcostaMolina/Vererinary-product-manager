// const mongoose = require("mongoose");
// require("dotenv").config({ path: "variables.env" });

// const conectarDB = async () => {
//   try {
//     await mongoose.connect(process.env.DB_MONGO, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("DB Conectada");
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// module.exports = conectarDB;

//////////////////////////////////////////////////////////

// const mongoose = require("mongoose");
// require("dotenv").config({ path: "variables.env" });

// const conectarDB = async () => {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/omegapetDB", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("DB Conectada local");
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// module.exports = conectarDB;

/////////////////////////////////////////////////////////////////////
const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const conectarDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://admin:admin@cluster0.mj8fuls.mongodb.net/omegapetDB?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Conectada atlas");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = conectarDB;
