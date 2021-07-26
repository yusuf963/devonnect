const mongoose = require('mongoose');
const config = require('config');
const db =config.get('mongoURI');


const connectDB = async()=>{
    try{
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Mongoose connected to ' + db);

    }catch(err){
        console.log(err.message);
        // Exit process with failer
        process.exit(1);
    }
}

module.exports = connectDB;