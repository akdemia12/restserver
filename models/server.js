const express = require('express');
var cors = require('cors')
const { dbConnection } = require('../database/config')


class Server {
    constructor() {

        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';


       
        //Conecct to database
        this.conectDB();



        //Middlewares
        this.middlewares();


        //Rutas de mi app
        this.routes();
    }

    async conectDB() {

        await dbConnection();
    }


    middlewares(){ //public carpeta
        
        //cos
        this.app.use(cors());

        // lectura y parseo del body
        this.app.use( express.json() );

        this.app.use( express.static('public'));

    }

    routes() { //end points


       this.app.use(this.usuariosPath, require('../routes/user'))

        
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        })

        }
}



module.exports = Server;