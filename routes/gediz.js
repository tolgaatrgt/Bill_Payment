var express = require('express');
var router = express.Router();
var mssql = require('mssql')

var connection = new mssql.ConnectionPool({
    user: 'dbms',
    password: '123123',
    server: 'localhost',
    database: 'GedizDB',
    port: 1433
}).connect();


router.post('/newbill', async (req, res, next) => {
    const pool = await connection;
    const borç = Math.round(Math.random() * 100) + 20
    const query = `INSERT INTO Elektrik (AboneNo,Borç,isPaid) VALUES ('${req.body.AboneNo}','${borç}',0)`;

    pool.request().query(query, (err, row, fields) => {
        if (err) {
            console.log(err);
            res.status(400).json({ err })
            return;
        }

        if (row.rowsAffected[0] > 0) {
            res.status(200).json({
                'success': true, 'data': true
            })
        } else {
            res.status(400).json({
                'success': false, data: null
            })
        }
    })
});

router.get("/getbill/:FaturaID", async (req, res) => {
    const pool = await connection;
    const query = `SELECT * FROM Elektrik WHERE FaturaID = '${req.params.FaturaID}'`;
    pool.request().query(query, (err, row, fields) => {
        if (err) {
            console.log(err);
            res.status(400).json({ err })
            return;
        }

        if (row.rowsAffected[0] > 0) {
            res.status(200).json({
                'success': true, 'data': row.recordset[0]
            })
        } else {
            res.status(400).json({
                'success': false, data: null
            })
        }
    })

});

router.post('/getbill', async (req, res, next) => {
    const pool = await connection;
    const query = `SELECT * FROM Elektrik WHERE AboneNo = '${req.body.AboneNo}' AND isPaid=0`;

    pool.request().query(query, (err, row, fields) => {
        if (err) {
            console.log(err);
            res.status(400).json({ err })
            return;
        }

        if (row.rowsAffected[0] > 0) {
            res.status(200).json({
                'success': true, 'data': row.recordset
            })
        } else {
            res.status(400).json({
                'success': false, data: null
            })
        }
    })
});

router.get('/paybill/:FaturaID', async (req, res, next) => {

    const pool = await connection;
    const query = `UPDATE Elektrik SET isPaid=1 WHERE FaturaID =${parseInt(req.params.FaturaID)}`;

    pool.request().query(query, (err, row, fields) => {
        if (err) {
            console.log(err);
            res.status(400).json({ err })
            return;
        }

        if (row.rowsAffected[0] > 0) {
            res.status(200).json({
                'success': true, 'data': row.recordset
            })
        } else {
            res.status(400).json({
                'success': false, data: null
            })
        }
    })

});




router.get("/", (req, res, next) => {
    res.send("Baglaniyor");
})

module.exports = router