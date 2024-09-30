const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const upload = require('../middleware/upload');

router.route('/')
    .get(taskController.getTasks)
    .post(upload.single('linkedFile'), taskController.createTask);

router.route('/:id')
    .put(taskController.updateTask)
    .delete(taskController.deleteTask);

module.exports = router;
