// IC20 – COSC 2328 – Professor McCurry
// Implemented by: Van Wright

const express = require('express');
const router  = express.Router();

let missions = [
  { id: 1, name: 'Alpha Probe',  destination: 'Mars'   },
  { id: 2, name: 'Deep Survey',  destination: 'Europa' },
];
let nextId = 3;

// GET /ic20/missions - return all missions
router.get('/missions', (req, res) => {
  res.status(200).json(missions);
});

// POST /ic20/missions - add a new mission
router.post('/missions', (req, res) => {
  const name = req.body.name;
  const destination = req.body.destination;

  if (!name || !destination) {
    res.status(400).json({ error: 'name and destination required' });
    return;
  }

  const newMission = { id: nextId, name: name, destination: destination };
  nextId++;
  missions.push(newMission);
  res.status(201).json(newMission);
});

router.delete('/missions/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = missions.findIndex(m => m.id === id);

  if (idx === -1) {
    res.status(404).json({ error: 'not found' });
    return;
  }

  const removed = missions.splice(idx, 1)[0];
  res.status(200).json(removed);
});

module.exports = router;