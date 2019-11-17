import fs from 'fs';
import path from 'path';
import knex from '../../helpers/knex';

const getModelFiles = dir => fs.readdirSync(dir)
	.filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js' && file !== 'indexmdm.js'))
    .map(file => path.join(dir, file));
    
const files = getModelFiles(__dirname);

const models = files.reduce((modelsObj, filename) => {
	// eslint-disable-next-line global-require
	const initModel = require(filename); // eslint-disable-line import/no-dynamic-require
	const model = initModel(knex);

	// eslint-disable-next-line no-param-reassign
	if (model) modelsObj[model.name] = model;

	return modelsObj;
}, {});

module.exports = models;
