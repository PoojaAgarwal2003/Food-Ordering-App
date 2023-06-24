const mongoose=require('mongoose');

mongoose.set('strictQuery', false);
const mongoURI='mongodb+srv://gofood:Mongo%40123@cluster0.1ltutu6.mongodb.net/gofood?retryWrites=true&w=majority'
const mongoDB=async()=>{
    await mongoose.connect(mongoURI,{useNewUrlParser:true},async(err,result)=>{
        if(err)console.log("---",err)
        else{
           
        console.log("Connected Successfully");
        const fetched_data=await mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray(async function (err, data) {
            const foodCategory =await mongoose.connection.db.collection("food_category");
            foodCategory.find({}).toArray(function (err,catData){
                    if(err)console.log(err);
                    else{
                        global.food_items=data;
                        global.food_category=catData;
                    }
            })
        })
        }
    });
}
module.exports=mongoDB;