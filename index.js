import express from 'express'
import UsersRoute from './route/UsersRoute.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import StuffRoute from './route/StuffRoute.js'
import EntryRoute from './route/EntryRoute.js'
const app = express()
const port = 3000

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser()); // Kalau pakai cookie
app.use(bodyParser.json({}));

//ROUTE
app.use(UsersRoute)
app.use(StuffRoute)
app.use(EntryRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
