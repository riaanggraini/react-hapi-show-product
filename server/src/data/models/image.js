import model from '../../helpers/model';

const name = 'Image';
const tableName = 'image';

const selectableProps = [
	'id',
    'url',
    'id_product',
];

module.exports = (knex) => {
	const userModel = model({
		knex,
		name,
		tableName,
		selectableProps,
	});

	return {
		...userModel,
	};
};
