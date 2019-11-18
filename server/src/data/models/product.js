import model from '../../helpers/model';

const name = 'Product';
const tableName = 'product';

const selectableProps = [
	'id',
    'name',
    'description',
    'price',
    'product_no'
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
