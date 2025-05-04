const mongoose=require("mongoose");
const alldata=require("./data.js");
const listing=require("../models/listings.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
  .then(() => {
    console.log("connected to mongo database")
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
};

const initdb= async ()=>{
    await listing.deleteMany({});
    alldata.data=alldata.data.map((obj)=>({...obj,owner:'67f8d003733f7b862083467b'}));
    await listing.insertMany(alldata.data);
    console.log("all init data inserted");
};

initdb();