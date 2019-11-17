// Update with your config settings.

const config = require ('config')
const path = require('path');
const BASE_PATH = path.join(__dirname, 'src', 'data');

module.exports = {
	development: {
		client: 'pg',
		connection: {
			multipleStatements: true,
			host: config.get('database.host'),
			database: config.get('database.dbName'),
            user: config.get('database.user'),
			password: config.get('database.password'),
			port: config.get('database.port'),
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			directory: path.join(BASE_PATH, 'migrations'),
		},
	},
};
