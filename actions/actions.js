const express = require('express');
const actionDb = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    actionDb.get().then(action => {
        res.send(action)
    })
    .catch(err => res.json({message: err}))
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    actionDb.get(id).then(action => {
        if(!action) {
            res.status(404).json({ message: "The action with the specified ID does not exist."})
        } else {
            res.send(action);
        }
    })
    .catch(err => res.json({message: err}))
})

router.post('/:id', (req, res) => {
    const actionBody = req.body;
    actionBody.project_id = req.params.id;
    actionDb.insert(actionBody).then(action => {
        if(!action) {
            res.status(404).json({ message: "The project with the specified ID does not exist."})
        } else if (!actionBody.description || !actionBody.notes) {
            res.status(500).json({message: "A description and notes are required for an action"})
        } else {
            res.status(201).json(action);
        }
    })
    .catch(err => {
        if (!actionBody.description || !actionBody.notes) {
            res.status(500).json({message: "A description and notes are required for an action"})
        } else {
            res.status(500).json({message: "project id doesn't exist", error: err})
        }
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const actionUpdate = req.body;
    actionDb.update(id, actionUpdate).then(action => {
        if(!id) {
            res.status(404).json({ message: "The action with the specified ID does not exist."})
        } else {
            res.json(action);
        }
    })
    .catch(err => res.json({message: err}))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    actionDb.remove(id).then(action => {
        if(!id) {
            res.status(404).json({ message: "The action with the specified ID does not exist."})
        } else {
            res.status(204).json(action);
        }
    })
    .catch(err => res.json({message: err}))
})

module.exports = router;