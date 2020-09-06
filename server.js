const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4000;
const URI = "mongodb+srv://Aswani:AswaniMongoDB@cluster0-aerfv.mongodb.net/school?retryWrites=true&w=majority";
app.use(cors());
app.use(express.json());

mongoose.connect(URI, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true}).then(result => {
    console.log("sucessfully connected");
}).catch(err => {
    console.log(err);
});

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const learnerRoutes = require('./routes/learner');
app.use('/learner', learnerRoutes);

app.listen(PORT);