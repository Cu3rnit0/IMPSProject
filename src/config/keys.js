require('dotenv').config()

module.exports= {
    //configurando objeto para inyectar en el pool de conexiones 
    
    database:{
        host: process.env.HOST,
        user: process.env.USER,
        port: process.env.PORT_DATABASE,
        password: process.env.PASSSWORD,
        database: process.env.DATABSE_NAME
    }
}