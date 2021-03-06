module.exports={
	schema: true,
	attributes:{
		phoneNumber:{
			type: 'string'
		},
		date:{
			type: 'datetime',
			required: true
		},
		city:{
			type: 'string',
			required: true
		},
		cityArea:{
			type: 'string',
		},
		cid:{
			type:'string',
			required: true
		},
		uid:{
			type:'string',
			required: true
		}
	}
};