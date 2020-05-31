const fs = require('fs'),
	express = require('express'),
	server = express();

server.use(express.json());

const db = JSON.parse(fs.readFileSync('./db.json'));

//GET all pokemons
server.get('/pokemons', function(req, res) {});

//GET pokemon with specified id
server.get('/pokemons/:pokemonId', function(req, res) {
	const id = parseInt(req.params.id);
	const pok = db.find((pokemon) => pokemon.id === id);
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
});

//PUT edited pokemon in-place of pokemon with specified id
server.put('/pokemons/:pokemonId', function(req, res) {});

//DELETE pokemon with specified id
server.delete('/pokemons/:pokemonId', function(req, res) {});

//START SERVER
server.listen(3000, function() {
	console.log('Server running');
});
