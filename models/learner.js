const mongoose = require('mongoose');

const learnerSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phoneNo:{
        type: String,
        required: true
    },
   
    github:{
        type: String,
        required: true
    },
    linkedin:{
        type: String,
        required: true
    },
    facebook:{
        type: String,
        required: true
    }

},{
    timestamps: true
});

const Learner = mongoose.model('Learner', learnerSchema);

module.exports = Learner;