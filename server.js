const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');
const { ObjectId } = require('mongodb');
const PORT = process.env.PORT || 5000;
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(cookieParser());
app.set('port', (process.env.PORT || 5000));

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://brendenm:xdxAoJ6GBmGQk4I0@budgetbuddies.rc2gm.mongodb.net/budgetbuddies?retryWrites=true&w=majority';
const client = new MongoClient(url, { useUnifiedTopology: true });
client.connect();


app.post('/api/login', async (req, res, next) => {
          try
          {
        // Connecting to the db
            const db = client.db();
            
            const result = await db.collection('users').find({"email": req.param("username"), "password": req.param("password")}).toArray();
            if (result.length > 0)
                error = 'none'
            else
                error = 'user not found'
        // Insert newBudget into db
            
          }
          catch(e)
          {
            error = e.toString();
            if (client === null)
                error = "not connected";
          }

          // Return: error
          var ret = {error: error};
          res.status(200).json(ret);
      //    
  //  }
})

app.listen(PORT, () =>
{
  console.log(`Server listening on port ${PORT}.`);
  if (client === null) {
    console.log("not connected");
}
});