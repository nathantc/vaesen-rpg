const mongoose = require('mongoose');

mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const taskSchema = new mongoose.Schema({
  title: String,
  completed: {
    type: Boolean,
    default: false
  }
});

const TaskModel = mongoose.model('task', taskSchema);

module.exports = async function (context, req) {
  context.res = {
    header: {
      'Content-Type': 'application/json'
    }
  }

  switch (req.method) {
    case 'GET':
      await getTasks(context);
      break;
    case 'POST':
      await createTask(context);
      break;
    case 'PUT':
      await updateTask(context);
      break;
  }
};

async function getTasks(context) {
  const tasks = await TaskModel.find();
  context.res.body = { tasks: tasks };
}

async function createTask(context) {
  const body = context.req.body;
  const task = await TaskModel.create(body);
  context.res.status = 201;
  context.res.body = task;
}

async function updateTask(context) {
  const id = context.bindingData.id;
  const task = context.req.body;
  const result = await TaskModel.updateOne({ _id: id }, task);
  if (result.nModified === 1) {
    context.res.status = 204;
  } else {
    context.res.status = 404;
  }
}