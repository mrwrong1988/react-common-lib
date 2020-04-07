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
		[key]:  {
			data: resourceConfig[key].initialData,
		},
	}
}, {})

export default resourceConfig
