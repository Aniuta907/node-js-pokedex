const fs = require('fs'),
	express = require('express'),
	server = express();

server.use(express.json());

const db = JSON.parse(fs.readFileSync('./db.json'));

//GET all pokemons or pokemons with specified name
server.get('/pokemons', function(req, res) {
	const pokemonName = req.query.name;
	let pok;

	if (pokemonName) pok = db.filter((pokemon) => pokemon.name.indexOf(pokemonName) != -1);
	else pok = db;

	return res.status(200).json({
		message: 'Welcome to the world of pokemons',
		data: {
			pokemons: pok
		}
	});
});

//GET pokemon with specified id
server.get('/pokemons/:pokemonId', function(req, res) {
	const pokemonId = parseInt(req.params.pokemonId);
	const pok = db.find((pokemon) => pokemon.id === pokemonId);

	if (pok === undefined || pok === null) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid Id'
		});
	}

	res.status(200).json({
		status: 'success',
		data: {
			pok
		}
	});
});

//POST new pokemon
server.post('/pokemons', function(req, res) {
	const newId = db[db.length - 1].id + 1;
	const newPokemon = {
		name: '',
		id: newId,
		damage: '',
		birthdate: '',
		...req.body
	};
	db.push(newPokemon);
	res.status(200).send({ message: 'Pokemon was added.' });
});

//PUT edited pokemon in-place of pokemon with specified id
server.put('/pokemons/:pokemonId', function(req, res) {
	const pokemonId = parseInt(req.params.pokemonId);
	const pok = db.find((pokemon) => pokemon.id === pokemonId);

	const newPokemon = {
		...pok,
		...req.body
	};

	if (pok === undefined || pok === null) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid Id'
		});
	}

	db.splice(db.indexOf(pok), 1, newPokemon);

	res.status(200).json({
		status: 'success',
		data: {
			pokemon: newPokemon
		}
	});
});

//DELETE pokemon with specified id
server.delete('/pokemons/:pokemonId', function(req, res) {
	const pokemonId = parseInt(req.params.pokemonId);
	const pok = db.find((pokemon) => pokemon.id === pokemonId);

	if (pok === undefined || pok === null) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid Id'
		});
	}

	db.splice(db.indexOf(pok), 1);

	res.status(200).send({ message: 'Pokemon was deleted.' });
});

//GET all caught pokemons
server.get('/caught', function(req, res) {
	const caughtDb = db.filter((pokemon) => pokemon.caught === true);

	res.status(200).json({
		message: 'These pokemons were caught',
		data: {
			pokemons: caughtDb
		}
	});
});

//Catch specified pokemon
server.put('/caught/:pokemonId', function(req, res) {
	const pokemonId = parseInt(req.params.pokemonId);
	const pok = db.find((pokemon) => pokemon.id === pokemonId);

	if (pok === undefined || pok === null) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid Id'
		});
	}

	pok.caught = true;

	res.status(200).json({
		status: 'success',
		data: {
			pokemon: pok
		}
	});
});

//START SERVER
server.listen(3000, function() {
	console.log('Server running');
});
