const resourceConfig = {
	privateResourceList: {
		path: '/datahubset/datasetApi/resource-manager/search/private',
		// getData: res => res,
	},
	testLocal: {
		path: 'local/test',
		local: true,
	},
}

export const initialState = Object.keys(resourceConfig).reduce((state, key) => {
	return {
		...state,
		[key]: resourceConfig[key].local
			? resourceConfig[key].initialData
			: {
					data: resourceConfig[key].initialData,
					params: 'undefined',
					loading: false,
					error: null,
			  },
	}
}, {})

export default resourceConfig
