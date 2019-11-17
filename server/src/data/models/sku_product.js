import model from '../../helpers/model';

const name = 'SkuProduct';
const tableName = 'sku_product';

const selectableProps = [
	'id',
    'name',
    'code',
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
