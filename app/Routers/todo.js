const router = require("express").Router();

let tasks = [
    {
      id: 1,
      task: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
      status: false,
    },
    {
      id: 2,
      task: "Contrary to popular belief, Lorem Ipsum is not simply random text. ",
      status: false,
    },
    {
      id: 3,
      task: "There are many variations of passages of Lorem Ipsum available,",
      status: false,
    },
    {
      id: 4,
      task: "It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, ",
      status: false,
    },
    {
      id: 5,
      task: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      status: false,
    },
  ];

// tasks list
router.get('/', (req, res) => {
    res.status(200).json(tasks);
});

// create task
router.post('/', (req, res) => {
    console.log(req.body);
    if(req.body.id || req.body.task){
        let new_task = {
            id: req.body.id,
            task: req.body.task,
            status: false
        }
        tasks.push(new_task);
        res.status(200).json(new_task);
    }else{
        res.status(400).json({error: 'Bad request'});
    }

});
// delete task
router.delete('/:id', (req, res) => {
    let data = tasks.filter(item => item.id != req.params.id);
    tasks = data;
    res.status(200).json(tasks);
});

// set status true = done
router.put('/:id', (req, res) => {
    let data = [...tasks];
    data.forEach((task) => {
        if (task.id == req.params.id) {
          task.status = true;
          return;
        }
      });
      tasks = data;
    res.status(200).json(tasks);
});

// edit task
router.put('/edit/:id', (req, res) => {
  let data = [...tasks];
  data.forEach((task) => {
      if (task.id == req.params.id) {
        task.task = req.body.task;
        return;
      }
    });
    tasks = data;
  res.status(200).json(tasks);
});


module.exports = router;