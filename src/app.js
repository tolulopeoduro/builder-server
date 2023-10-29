import express, { json } from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import users from './routes/users';

const app = express();

app.use(json())

const PORT = process.env.PORT || 4000;

const uri = "mongodb+srv://newolddev:newolddev@cluster0.stx8m0n.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
		app.locals.client = client;
		app.listen(PORT, () => console.log("Serving @" + PORT))
  }
}
run().catch(console.dir);

app.use("/users", users);