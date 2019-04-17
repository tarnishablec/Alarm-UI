
export const dynamicRouter=[
	{
		path: '/playground',
		name: 'playground',
		component: ()=>import('../views/Playground.vue'),
		meta: {
			roles:["1"],
		}
	},
];