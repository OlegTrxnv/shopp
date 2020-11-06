import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

// this is independent from server seeder for importing/destroying sample data
dotenv.config();
connectDB();

const importData = async () => {
  try {
    // clear data before importing anything
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    // add admin to all products before seeding
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data successfully imported!");
    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed!");
    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

// process.argv returns an array containing the command-line arguments passed when the Node.js process was launched:
// /usr/local/bin/node C:\Users\PC\Projects\React Udemy\shopp> node backend/seeder.js -d
// [       0         ][                        1                                    ][ 2 ][ 3 ][ 4 ]...

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
