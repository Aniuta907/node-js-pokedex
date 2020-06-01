const fs = require('fs'),
	express = require('express'),
	server = express();

server.use(express.json());

const db = JSON.parse(fs.readFileSync('./db.json'));

//GET all pokemons
server.get('/pokemons', function(req, res) {
	res.status(200).json({
		status: 'Welcome to the world of pokemons',
		data: {
			pokemons: db
		}
	});
});

//GET pokemon with specified id
server.get('/pokemons/:pokemonId', function(req, res) {
	const pokemonId = parseInt(req.params.id);
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
	res.send('Add a pokemon');
});

//PUT edited pokemon in-place of pokemon with specified id
server.put('/pokemons/:pokemonId', function(req, res) {
	res.send('Update the pokemon');
});

//DELETE pokemon with specified id
server.delete('/pokemons/:pokemonId', function(req, res) {
	res.send('Delete the pokemon');
});

//START SERVER
server.listen(3000, function() {
	console.log('Server running');
});
