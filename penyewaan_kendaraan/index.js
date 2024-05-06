const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const app = express()
const db = require("./routes/koneksi")
const port = 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())


const pemilik = require('./routes/pemilik')
const penyewa = require('./routes/penyewa')
const kendaraan = require('./routes/kendaraan')
const detail_transaksi = require('./routes/detail_transaksi')

 
app.use("/pemilik", pemilik)
app.use("/penyewa", penyewa)
app.use("/kendaraan", kendaraan)
app.use("/detail_transaksi", detail_transaksi)


app.listen(port, ()=>{
    console.log("Running "+port)
})