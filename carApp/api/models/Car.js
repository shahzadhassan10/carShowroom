module.exports={
	attributes:{
		name:{
			type: 'string',
			required: true
		},
		isNew:{
			type:'boolean'
		},
		model:{
			type: 'string',
			required: true
		},
		version:{
			type: 'string',
			required: true
		},
		make:{
			type: 'string',
			required: true
		},
		modelYear:{
			type: 'string',
			required: true
		},
		registrationCopy:{
			type: 'string'
		},
		price:{
			type:'integer',
			required: true	
		},
		description:{
			type: 'string'			
		},
		images:{
			type: 'array'			
		},
		EngineDetails:{
			type:'json'
			/*EngineType:{
				type: 'string'
			},
			capacity:{
				type: 'integer'
			},
			transmission:{
				type: 'string'
			},
			displacement:{
				type: 'integer'
			},
			power:{
				type: 'integer'
			},
			torque:{
				type: 'integer'
			},
			gear:{
				type: 'integer'
			},
			valveMechanism:{
				type: 'string'
			},
			comparationRatio:{
				type: 'float'
			},
			noOfCylinders:{
				type: 'integer'
			},
			cylinderConfiguration:{
				type: 'string'
			},
			valvesPerCylinder:{
				type: 'integer'
			},*/
		},
		Body:{
			type:'json'
			/*BodyType:{
				type: 'string'
			},
			exteriorColor:{
				type: 'string'
			},
			length:{
				type: 'integer'
			},
			width:{
				type: 'integer'
			},
			height:{
				type: 'integer'
			},
			kerbWeight:{
				type: 'integer'
			},
			seatingCapacity:{
				type: 'integer'
			},
			noOfDoors:{
				type: 'integer'
			},
			wheelType:{
				type: 'string'
			},
			wheelSize:{
				type: 'integer'
			},
			tyres:{
				type: 'integer'
			}*/
		},
		Specification:{
			type:'json'
			/*mileage:{
				type: 'integer'
			},
			assembly:{
				type: 'string'
			},
			minimumTurningRadius:{
				type: 'integer'
			},
			fuelType:{
				type: 'string'
			},
			frontSuspension:{
				type: 'string'
			},
			rearSuspension:{
				type: 'string'
			},
			steeringType:{
				type: 'string'
			},
			powerAssited:{
				type: 'string'
			},
			frontBrakes:{
				type: 'string'
			},
			rareBrakes:{
				type: 'string'
			}*/
		},
		Features:{
			type:'json'

			/*airConditioner:{
				type:'boolean'
			},			 
			powerWindows:{
				type:'boolean'
			},			 
			powerSteering:{
				type:'boolean'
			},			 
			antiLockBrakingSystem:{
				type:'boolean'
			},			 
			airBags:{
				type:'boolean'
			}, 
			leatherSeats:{
				type:'boolean'
			},			 
			cruiseControl:{
				type:'boolean'
			},			 
			keylessEntry:{
				type:'boolean'
			},			 
			cdPlayer:{
				type:'boolean'
			},			 
			powerDoorLocks:{
				type:'boolean'
			},			 
			tractionControl:{
				type:'boolean'
			},			 
			immobilizer:{
				type:'boolean'
			},			 
			cupHolders:{
				type:'boolean'
			},			 
			foldingRearSeat:{
				type:'boolean'
			},			 
			rearWashWiper:{
				type:'boolean'
			},			 
			alloyWheels:{
				type:'boolean'
			},			 
			tubelessTyres:{
				type:'boolean'
			},			 
			centralLocking:{
				type:'boolean'
			},			 
			remoteBootFuelLid:{
				type:'boolean'
			},			 
			steeringAdjustment:{
				type:'boolean'
			},			 
			tachometer:{
				type:'boolean'
			},			 
			frontFogLights:{
				type:'boolean'
			},			 
			rearDefroster:{
				type:'boolean'
			},			 
			defogger:{
				type:'boolean'
			},			 
			powerSeats:{
				type:'boolean'
			},			 
			AMFMRadio:{
				type:'boolean'
			},			 
			cassettePlayer:{
				type:'boolean'
			},			 
			sunRoof:{
				type:'boolean'
			},			 
			coolBox:{
				type:'boolean'
			},			 
			DVDPlayer:{
				type:'boolean'
			}*/
		}

	}

};