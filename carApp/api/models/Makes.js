module.exports={
	schema: true,
	attributes:{
		make:{
			type: 'string',
			required: true
		},
		model:{
			type: 'string',
			required: true
		},
		version:{
			type:'string',
			required: true
		}
	}
};