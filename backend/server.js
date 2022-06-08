import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const taskModel = new mongoose.Schema({
  userId: Number, //the userid from login here/create user, use query to find in endpoint
  tasks: [
    {name: String, date: Number, done: Boolean}
  ],
});

const Task = mongoose.model('Task', taskModel);

const testTask = new Task({userId: 111, tasks: [{name: 'testname', date: 2022, done: true}]});
await testTask.save();

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Server response ok");
});

app.post("/createtask", async (req, res) => {
  const { userId, name, date, done } = req.body;

  //do a "if user, create task with userId same as user login userId"
  //after first task is created (check validate with find() to see if exists), only do update task model to save in same collection
  //what happens if findoneanddelete() on id with tasks until 0 tasks, will collection still remain? (i.e. === true)

  //something like this:
  // Task.update(
  //   //this userId to be same as userId in user login (to sort tasks connected to user)
  //   { _id: userId },
  //   { $push: { tasks: name, date, done }},
  //   done
  // )

  try {
    const newTask = await new Task({userId, tasks: [{name, date, done}]});
    newTask.save();
    res.status(201).json({task: newTask._id });
  } catch(err) {
    res.status(400).json({message: 'Could not create task', errors: err.message})
  }
});

app.get("/gettask", async (req, res) => {
  //for the userId, save it from the create/login user to node req/res? to use here
  const selectTask = await Task.findOne({ userId: 555 }).exec();
  res.status(201).json({ selectTask });
});

app.get("/test", (req, res) => {
    res.send("test ok");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
