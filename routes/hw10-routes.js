// HW10 – COSC 2328 – Professor McCurry
// Implemented by: Van Wright

const express = require('express');
const router = express.Router();
const db = require('../db');

function buildPage(monsters, message, error, battle) {
	return `<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="/hw10/css/hw10.css">
</head>
<body>
	${message ? `<p class="banner-success">${message}</p>` : ''}
	${error ? `<p class="banner-error">${error}</p>` : ''}

	${monsters.map(m => `
		<div class="monster-card">
			${m.name} ${m.species} ATK ${m.attack} DEF ${m.defense} HP ${m.hp} #${m.id}
		</div>
	`).join('')}

	<form action="/hw10/recruit" method="POST">
	    <label>Name <input type="text" name="name" required></label>
		<label>Type <input type="text" name="species" required></label>
		<label>Attack <input type="number" name="attack" required></label>
		<label>Defense <input type="number" name="defense" required></label>
		<label>HP <input type="number" name="hp" required></label>
		<button type="submit">Recruit</button>
	</form>

	<form action="/hw10/retire" method="POST">
		<label>Monster ID <input type="number" name="id" required></label>
		<button type="submit">Retire</button>
	</form>

	<form action="/hw10/battle" method="POST">
		<button type="submit">Battle!</button>
	</form>

	${battle ? `<div class="battle-results">
		<p>${battle.a.name} ${battle.a.species} ATK ${battle.a.attack} DEF ${battle.a.defense} HP ${battle.a.hp} Score: ${battle.scoreA}</p>
		<p>${battle.b.name} ${battle.b.species} ATK ${battle.b.attack} DEF ${battle.b.defense} HP ${battle.b.hp} Score: ${battle.scoreB}</p>
		<p>${battle.winner}</p>
	</div>` : ''}
</body>
</html>`;
}

router.get('/', (req, res) => {
  const message = req.query.message || null;
  const error   = req.query.error   || null;
  db.all('SELECT * FROM monsters ORDER BY id', [], (err, rows) => {
    if (err) return res.status(500).send('<p>Database error: ' + err.message + '</p>');
    const html = buildPage(rows, message, error, null);
    res.send(html);
  });
});

router.post('/recruit', (req, res) => {
  const { name, species, attack, defense, hp } = req.body;
  db.run(
    'INSERT INTO monsters (name, species, attack, defense, hp) VALUES (?, ?, ?, ?, ?)',
    [name, species, attack, defense, hp],
    function (err) {
      if (err) return res.redirect('/hw10?error=' + encodeURIComponent(err.message));
      res.redirect('/hw10?message=' + encodeURIComponent('Monster recruited!'));
    }
  );
});

router.post('/retire', (req, res) => {
  const { id } = req.body;
  db.run('DELETE FROM monsters WHERE id = ?', [id], function (err) {
    if (err) return res.redirect('/hw10?error=' + encodeURIComponent(err.message));
    if (this.changes === 0) {
      return res.redirect('/hw10?error=' + encodeURIComponent('Monster not found.'));
    }
    res.redirect('/hw10?message=' + encodeURIComponent('Monster retired!'));
  });
});

router.post('/battle', (req, res) => {
  db.all('SELECT * FROM monsters', [], (err, rows) => {
    if (err) return res.redirect('/hw10?error=' + encodeURIComponent(err.message));
    if (rows.length < 2) {
      return res.redirect('/hw10?error=' + encodeURIComponent('Not enough monsters to battle!'));
    }

    let i = Math.floor(Math.random() * rows.length);
    let j;
    do { j = Math.floor(Math.random() * rows.length); } while (j === i);

    const a = rows[i];
    const b = rows[j];
    const scoreA = a.attack + a.defense + a.hp;
    const scoreB = b.attack + b.defense + b.hp;

    let winner = 'Draw!';
    if (scoreA > scoreB) winner = a.name + ' wins!';
    else if (scoreB > scoreA) winner = b.name + ' wins!';

    const battle = { a, b, scoreA, scoreB, winner };
    const html   = buildPage(rows, null, null, battle);
    res.send(html);
  });
});

module.exports = router;
