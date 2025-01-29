const mongoose = require('mongoose');

// const connection = mongoose.connect('mongodb:0.0.0.0/driveclone').then{
//     console.log('Connected to MongoDB');
// }

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI).then(() => {
             console.log('Connected to MongoDB');  
        }
    );
}

module.exports = connectToDB;
