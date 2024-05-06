const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const app = express.Router()
const db = require("./koneksi")
const port = 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.get("/", (req, res)=>{
    let sql = "select * from pemilik"
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
                pemilik: result
            }
        }
        res.json(respon)
    })
})

app.get("/:id", (req, res)=>{
    let plat = {
        plat: req.params.id
    }
    let sql = "select * from pemilik where ?"
    db.query(sql, plat, (error,result)=>{
        let respon = null
        if(error){
            respon = {
                message: error.message
            }
        }
        else{
            respon = {
                count: result.length,
                pemilik: result
            }
        }
        res.json(respon)
    })
})

app.post("/", (req,res)=>{
    let data = {
        nama: req.body.nama,
        alamat: req.body.alamat
    }
    let sql = "insert into pemilik set ?"
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
        nama: req.body.nama,
        alamat: req.body.alamat
    },
    {
        id_pemilik: req.params.id
    }]
    let sql = "update pemilik set ? where ?"

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
        id_pemilik: req.params.id
    }
    let sql = "delete from pemilik where ?"
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