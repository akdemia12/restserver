const { Router } = require('express');
const { check, query } = require('express-validator');
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user');
const { validarCampos } = require('../midddlewares/validar-campos');
const { rolValido, existeEmail, existeUser } = require('../helpers/db-validators');


const router = Router()


router.get('/',[
    query("limite", "El valor 'limite' debe ser numerico")
    .isNumeric()
    .optional(),
    query("desde", "El valor 'desde' debe ser numerico")
    .isNumeric()
    .optional(),
    validarCampos,
],userGet );

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUser),
    check( 'rol' ).custom(rolValido),
    validarCampos, 

], userPut);

router.post('/', [
    check( 'nombre', 'El nombre es obligatorio').not().isEmpty(),
    check( 'correo', 'Correo no valido').isEmail(),
    check( 'correo' ).custom(existeEmail), 
    check( 'password', 'El password debe tener mas de 6 caracteres').isLength({min : 6}),
    /* check( 'rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']), */
    check( 'rol' ).custom(rolValido),
    validarCampos,
], userPost );

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUser),
    validarCampos
],userDelete );

router.patch('/', userPatch );







module.exports = router;
