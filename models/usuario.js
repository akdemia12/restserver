const {Schema, model} = require('mongoose');



const UserSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
        
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
        
    },
    password: {
        type: String,
        required: [true, 'La contrasña es obligatoria']
        
    },
    img: {
        type: String,
        
        
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
    type: Boolean,
    default: true

    
    },
    google: {
        type: Boolean,
        default: false

    }
    
    
    

});


UserSchema.methods.toJSON =  function() {
    const {__v, password, ...usuario } = this.toObject();
    return usuario
}





module.exports =  model( 'Usuario', UserSchema );