import mongoose  from  'mongoose'

const mongoDb = async () => {
  
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "GoldFocus-Db", 
    });

    console.log("Database Connected");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); 
  }
};


export default mongoDb;
