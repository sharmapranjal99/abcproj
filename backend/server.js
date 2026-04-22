const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// DB connect
mongoose.connect('mongodb://dbUser:sharmapranjal99@ac-l5ro8cx-shard-00-00.t1twlwg.mongodb.net:27017,ac-l5ro8cx-shard-00-01.t1twlwg.mongodb.net:27017,ac-l5ro8cx-shard-00-02.t1twlwg.mongodb.net:27017/?ssl=true&replicaSet=atlas-m7349j-shard-0&authSource=admin&appName=Cluster0')
.then(()=>console.log("DB Connected"))
.catch(err=>console.log(err));

// Routes import
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

// Use routes
app.use('/', authRoutes);
app.use('/', expenseRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));