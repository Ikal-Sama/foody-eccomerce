const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

// mongodb config
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foody-ecommerce.p2z1tzf.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    await client.connect();

    // databse & collections
    const menuCollection = client.db("foody-ecommerce").collection("menus");
    const cartCollection = client.db("foody-ecommerce").collection("cartItems");

    // all menu items operations
    app.get("/menu", async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });

    // all cart operations

    //posting cart to db
    app.post("/carts", async (req, res) => {
      const cartItem = req.body;
      const result = await cartCollection.insertOne(cartItem);
      res.send(result);
    });

    // get carts using email
    app.get("/carts", async (req, res) => {
      const email = req.query.email;
      const filter = { email: email };
      const result = await cartCollection.find(filter).toArray();
      res.send(result);
    });

    // get specific carts
    app.get("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await cartCollection.findOne(filter);
      res.send(result);
    });

    // delete items from cart
    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(filter);
      res.send(result);
    });

    // update carts quantity
    app.put("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const { quantity } = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          quantity: parseInt(quantity, 10),
        },
      };

      const result = await cartCollection.updateOne(filter, updateDoc, options);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello Daniel!");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
