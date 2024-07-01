const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://shreeyaverma:Karmarule$123@cluster0.cndvhvk.mongodb.net/Bhukkad?retryWrites=true&w=majority&appName=Cluster0'
// mongoose.set('strictQuery', true);
const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("....", err)
        else {
            console.log("connected!");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(function (err, data) {
                if (err)
                    console.log(err);
                else
                    console.log();
            });
        }
    });
}

module.exports = mongoDB;