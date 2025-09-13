import express from 'express'
import UsersRoute from './route/UsersRoute.js'
import cors from 'cors';
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import StuffRoute from './route/StuffRoute.js'
import EntryRoute from './route/EntryRoute.js'
const app = express()
const port = process.env.PORT || 3000; // fallback ke 3000 kalau dijalankan local

app.use(cors());
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
