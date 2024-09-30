const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTask = async (req, res) => {
    const { title, description, deadline } = req.body;
    const linkedFile = req.file ? req.file.buffer : null;

    const task = new Task({ title, description, deadline, linkedFile });
    
    try {
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateTask = async (req, res) => {
    const { title, description, deadline, status } = req.body;
    const taskId = req.params.id;

    try {
        // Find the task by ID
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Update task fields
        if (title) task.title = title;
        if (description) task.description = description;
        if (deadline) task.deadline = deadline;
        if (status) task.status = status;

        // Handle file upload
        if (req.file) {
            task.linkedFile = req.file.buffer; // Store the PDF file in the task
        }

        // Save the updated task
        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.deleteTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        // Find the task by ID and delete it
        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(204).send(); // No content to return after deletion
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update and delete tasks similarly
