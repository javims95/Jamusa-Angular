const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connection/connection');

const jwt = require('jsonwebtoken');

router.get('/', (req,res)=>{
  mysqlConnection.query('select * from user', (err,rows,fields) => {
    if(!err){
      res.json(rows);
    }else{
      console.log(err);
    }
  })
});



module.exports = router;