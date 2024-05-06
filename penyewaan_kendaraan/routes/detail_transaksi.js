const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const app = express.Router()
const db = require("./koneksi")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.get("/", (req, res)=>{
    let sql = "select * from detail_transaksi"
    db.query(sql, (error,result)=>{
        let respon = null
        if(error){
            respon = {
                message: error.message
            }
        }
        else{
            respon = {
                count: result.length,
                detail_transaksi: result
            }
        }
        res.json(respon)
    })
})

app.get("/:id", (req, res)=>{
    let data = {
        id_detail_transaksi: req.params.id
    }
    let sql = "select * from detail_transaksi where ?"
    db.query(sql, data, (error,result)=>{
        let respon = null
        if(error){
            respon = {
                message: error.message
            }
        }
        else{
            respon = {
                count: result.length,
                detail_transaksi: result
            }
        }
        res.json(respon)
    })
})

app.post("/", (req,res)=>{
    let data = {
        id_penyewa: req.body.id_penyewa,
        id_kendaraan: req.body.id_kendaraan,
        lama_sewa: req.body.lama_sewa,
        harga_total: req.body.harga_total
    }
    let sql = "insert into detail_transaksi set ?"
    db.query(sql, data, (error, result)=>{
        let respon = null
        if(error){
            respon = {
                message: error.message
            }
        }
        else{
            respon = {
                pesan: result.affectedRows + "data inserted"
            }
        }
        res.json(respon)
    })
})


app.put("/:id", (req,res)=>{
    let data = [{
        id_penyewa: req.body.id_penyewa,
        id_kendaraan: req.body.id_kendaraan,
        lama_sewa: req.body.lama_sewa,
        harga_total: req.body.harga_total
    },
    {
        id_detail_transaksi: req.params.id
    }]
    let sql = "update detail_transaksi set ? where ?"
    db.query(sql, data, (error, result)=>{
        let respon = null
        if(error){
            respon = {
                message: error.message
            }
        }
        else{
            respon = {
                pesan: result.affectedRows + "data berhasil di update"
            }
        }
        res.json(respon)
    })
})

app.delete("/:id", (req,res)=>{
    let data = {
        id_detail_transaksi: req.params.id
    }
    let sql = "delete from detail_transaksi where ?"
    db.query(sql, data,(error, result)=>{
        if(error){
            respon = {
                message: error.message
            }
        }
        else{
            respon = {
                message: result.affectedRows + "data deleted"
            }
        }
        res.json(respon)
    })
})

module.exports = app