const { response } = require('express');

const userGet = (req, res = response) => {

    const {q, nombre= 'NO NAME'} = req.query;

    res.json({
        ok: true,
        msg: 'get API = controlador',
        q,
        nombre
    });
  }
const userPost = (req, res = response) => {

    const {nombre, apellido} = req.body;



    res.json({
        ok: true,
        msg: 'post API = controlador',
        nombre, apellido
    });
  }
const userPut = (req, res = response) => {

    const {id} = req.params;

    res.json({
        ok: true,
        msg: 'put API = controlador',
        id
    });
  }
const userDelete = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'delete API = controlador'
    });
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