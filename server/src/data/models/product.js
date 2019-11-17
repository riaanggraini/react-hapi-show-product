import model from '../../helpers/model';

const name = 'Product';
const tableName = 'product';

const selectableProps = [
	'id',
    'name',
    'id_sku_product',
    'description',
    'price'
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
