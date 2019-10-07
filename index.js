/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, you might want to read it really slow, don't worry be happy
in every line there may be trouble, but if you worry you make it double, don't worry, be happy
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, be happy
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just API…
I need this code, just don't know where, perhaps should make some middleware, don't worry, be happy

Go code!
*/
require('dotenv').config()
const express = require('express');
const projectDb = require('./data/helpers/projectModel');
// const logger = require('./logger')

const server = express();
server.use(express.json());
// server.use(logger)

const port = process.env.PORT;

server.get('/projects', (req, res) => {
    console.log(res)
    projectDb.get().then(project => {
        res.send(project);
    })
    .catch(err => res.json({message: err}))
})

server.get('/projects/:id', (req, res) => {
    const id = req.params.id
    console.log(res)
    projectDb.get(id).then(project => {
        if(!project) {
            res.status(404).json({ message: "The project with the specified ID does not exist."})
        } else {
            res.send(project);
        }
    })
    .catch(err => res.json({message: err}))
})

server.post('/projects', (req, res) => {
    const newProject = req.body;
    projectDb.insert(newProject).then(project => {
        res.status(201).json(project);
    })
    .catch(err => res.json({message: err}))
})

server.put('/projects/:id', (req, res) => {
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

server.delete('/projects/:id', (req, res) => {
    const id = req.params.id
    projectDb.remove(id).then(project => {
        if(!project) {
            res.status(404).json({ message: "The project with the specified ID does not exist."})
        } else {
            res.status(204).json(project);
        }
    })
})

server.listen(port, () => {
    console.log(`=============================\n Server listing on port ${port} \n=============================`)
})