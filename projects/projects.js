
const express = require('express');
const projectDb = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    projectDb.get().then(project => {
        res.send(project);
    })
    .catch(err => res.json({message: err}))
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    projectDb.get(id).then(project => {
        if(!project) {
            res.status(404).json({ message: "The project with the specified ID does not exist."})
        } else {
            res.send(project);
        }
    })
    .catch(err => res.json({message: err}))
})

router.post('/', (req, res) => {
    const newProject = req.body;
    projectDb.insert(newProject).then(project => {
        res.status(201).json(project);
    })
    .catch(err => res.json({message: err}))
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const projectUpdate = req.body;
    projectDb.update(id, projectUpdate).then(project => {
        if(!project) {
            res.status(404).json({ message: "The project with the specified ID does not exist."})
        } else {
            res.json(project)
        }
        
    })
    .catch(err => res.json({message: err}))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    projectDb.remove(id).then(project => {
        if(!project) {
            res.status(404).json({ message: "The project with the specified ID does not exist."})
        } else {
            res.status(204).json(project);
        }
    })
})

router.get('/actions/:id', (req, res) => {
    const id = req.params.id;
    projectDb.getProjectActions(id).then(project => {
        if(!project) {
            res.status(404).json({ message: "The project with the specified ID does not exist."})
        } else if (project.length === 0) {
            res.json({message: "This project has no actions"})
        } else {
            res.send(project);
        }
    })
})

module.exports = router;