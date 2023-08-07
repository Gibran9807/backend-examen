import express from 'express'
import morgan from 'morgan'
import cors from 'cors'


import noticiasRoutes from './routes/noticias.routes'
import { createComentario } from './controllers/comentarios.controller'
import { createRespuesta } from './controllers/respuesta.controller'
import { signin, signup } from './controllers/auth.controller'


const app = express()

app.use(cors())

app.use(morgan('dev'))
app.use(express.json())


app.use('/noticias',noticiasRoutes)
app.use('/noticias/respuestas', createRespuesta)
app.use('/noticias/comentario', createComentario)
app.use('/signin', signin )
app.use('/signup', signup )


export default app