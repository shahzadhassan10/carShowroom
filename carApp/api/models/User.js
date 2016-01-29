module.exports={
	attributes:{
		name:{
			type: 'string',
			required: true
		},
		// userName:{
		// 	type: 'string',
		// 	required: true
		// },
		email:{
			type: 'email',
			required: true
		},
		phoneNumber:{
			type: 'string',
			required: true
		},
		password:{
			type: 'string',
			required: true
		},
		city:{
			type: 'string'
		},
		address:{
			type: 'string',
			required: true
		},
		role:{
			type:'string'
		},
		isActive:{
			type:'boolean'
		}
	}
};