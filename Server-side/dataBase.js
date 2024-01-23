import mongoose from "mongoose";

// define and export the data base
export function dataBaseConnection(){

    
    const mongooseParams = {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }

    mongoose.connect(process.env.DB_URL , mongooseParams)
    .then(() => console.log("Database is Connected"))
    .catch((err) => console.error(err))

}