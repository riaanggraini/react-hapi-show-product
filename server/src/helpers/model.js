module.exports = ({
	knex = {},
	name = 'name',
	tableName = 'tablename',
	selectableProps = [],
	timeout = 5000,
}) => {

	const find = (trx = null, filters = {}, props = null) => {
		const query = knex.select(props || selectableProps)
			.from(tableName)
			.where(filters)
			.timeout(timeout);
		if (trx) {
			query.transacting(trx);
		}
		return query;
	};
	const update = (trx = null, id, props) => {
		// eslint-disable-next-line no-param-reassign
		delete props.id; // not allowed to set `id`

		const query = knex.update(props)
			.from(tableName)
			.where({ id })
			.timeout(timeout);
		if (trx) {
			query.transacting(trx);
		}
		return query;
	};
	const destroy = (trx = null, id = false, filters = { id: null }) => {
		const query = knex.del()
			.from(tableName)
			.timeout(timeout);
		if (id) {
			query.where({ id });
		} else {
			query.where(filters);
		}
		if (trx) {
			query.transacting(trx);
		}
		return query;
    };
    
    const upsert = (trx = null, data) => {
		const q = trx || knex;
		if (trx) {
			q.transacting(trx);
        }

		const firstData = data[0] ? data[0] : data;
		return q.raw(`${knex(tableName).insert(data).toQuery()} ON CONFLICT DO UPDATE ${
			Object.getOwnPropertyNames(firstData).map(field => `${field}=VALUES(${field})`).join(', ')}`)
			.then(dbRes => (Object.values(dbRes)[0].insertId)).catch((err) => {
				throw err;
			});
	};

	return {
		name,
		tableName,
		selectableProps,
		timeout,
		find,
		update,
        destroy,
        upsert
	};
};
