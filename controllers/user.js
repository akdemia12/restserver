const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs= require('bcryptjs');



const userGet = async (req, res = response) => {

    /* const {q, nombre= 'NO NAME'} = req.query; */
    const {limite = 5, desde= 0 } = req.query;
    const query = {estado : true}
   

  const [total, usuarios] =await Promise.all([

    Usuario.countDocuments({query}),
    Usuario.find({query})
      .limit(Number(limite))
      .skip(Number(desde))

  ]);




    res.json({
        total,
        usuarios 
       
    });
  }
const userPost = async (req = request, res = response) => {

  
  

    const {nombre, correo, password, rol} = req.body;

    const usuario = new Usuario({nombre, correo, password, rol} );

    //verificar si el corre existe
   

    //encriptar la password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);




    //guardar en bd
    await usuario.save(); 


    //obtener respuesta
    res.json({
      
        usuario
    });
  }
const userPut = async (req, res = response) => {

    const {id} = req.params;
    const {_id, password, google,correo,  ...resto } = req.body;

    // Todo validar contra base de datos
    if (password) {
      //encriptar password
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync( password, salt);


    }  
    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        
        usuario
    });
  }
const userDelete = async (req, res = response) => {

    const {id} = req.params;

    //Borrar fisicamente
   /*  const usuario = await Usuario.findByIdAndDelete(id) */ //el q tenga el id
    const usuario = await Usuario.findByIdAndUpdate(id, {estado : false});

    res.json(usuario
    );
  }
const userPatch = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'patch API = controlador'
    });
  }



  module.exports = {
    userGet,
    userPatch,
    userDelete,
    userPut,
    userPost,
  }