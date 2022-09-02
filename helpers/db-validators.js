
const Role = require('../models/role');
const Usuario = require ( '../models/usuario')

const rolValido = async (rol = '') => {

    const existeRol = await Role.findOne({rol}) 
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

const existeEmail = async (correo = '') => {

const emailExiste = await Usuario.findOne({correo});
if ( emailExiste) {
  throw new Error (`El correo ${correo} ya esta en uso`)
  }
}

const existeUser = async (id = '') => {

const userExiste = await Usuario.findById(id);
if ( !userExiste) {
  throw new Error (`El usuario con id:${id} no existe`)
  }
}



module.exports = {

    rolValido,
    existeEmail,
    existeUser
}