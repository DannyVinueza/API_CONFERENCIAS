import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routerUsuario from './routers/usuario_routes.js'
import routerConferencistas from './routers/conferencista_routes.js'
import routerAuditorios from './routers/auditorios_routes.js'
import routerReservas from './routers/reservas_routes.js'

//Incializaciones
const app = express()
dotenv.config()

//Configuraciones
app.set('port', process.env.PORT || 3000)
app.use(cors())

//Middlewares
app.use(express.json())

//Variables globales

//Rutas
app.use('/api',routerUsuario);
app.use('/api',routerConferencistas);
app.use('/api',routerAuditorios);
app.use('/api',routerReservas)

app.get('/',(req,res)=>{
    res.json({"1":"Bienvenido",
              "2":"A mi repaso de prueba"})
})

export default app;