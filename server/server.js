const express=require("express")
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mongoose=require("mongoose")

mongoose.connect('mongodb://localhost:27017/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

const detailSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Detail = mongoose.model("Detail", detailSchema);

app.post("/details", async (req, res) => {
  try {
    const { name, age } = req.body;
    const newDetail = new Detail({ name, age });
    await newDetail.save();
    res.status(201).json(newDetail);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch all data
app.get("/details", async (req, res) => {
  try {
    const details = await Detail.find();
    res.json(details);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.listen(port,()=>{
    console.log("app running on localhost 5000")
})