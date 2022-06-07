const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connection/connection');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


router.get('/', (req, res) => {
  mysqlConnection.query('select * from user', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  })
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  mysqlConnection.query('select * from user where username = ?',
    [username],
    (err, rows, fields) => {
      const passwordEncrypt = rows[0].password;
      if (rows.length > 0) {
        bcrypt.compare(password, passwordEncrypt, function (err, result) {
          if (result == true) {
            delete rows[0].password;
            let data = JSON.stringify(rows[0]);
            const token = jwt.sign(data, 'stil');
            res.json({ token });

          } else {
            res.status(401).json('La contraseña no es correcta');
          }
        })
      }
    }
  )
})

// router.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   mysqlConnection.query('select id, username, role_id from user where username=? and password=?',
//     [username, password],
//     bcrypt.hash(password, 10, function (err, encryptPassword) {
//       console.log(password);
//       console.log(encryptPassword);
//       if (password == encryptPassword) {

//         (err, rows, fields) => {
//           if (!err) {
//             console.log(rows);
//             if (rows.length > 0) {
//               let data = JSON.stringify(rows[0]);
//               const token = jwt.sign(data, 'stil');
//               res.json({ token });
//             } else {
//               res.json('Usuario o clave incorrectos');
//             }

//           } else {
//             console.log(err);
//           }
//         }
//       } else {
//         res.status(401).json('Contraseña incorrecta');
//       }
//     })
//   )
// });

// router.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   mysqlConnection.query('select id, username, role_id from user where username=? and password=?',
//     [username, password],
//     (err, rows, fields) => {
//       if (!err) {
//         if (rows.length > 0) {
//           console.log('Hola');
//           let data = JSON.stringify(rows[0]);
//           const token = jwt.sign(data, 'stil');
//           res.json({ token });
//         } else {
//           res.json('Usuario o clave incorrectos');
//         }

//       } else {
//         console.log(err);
//       }
//     }
//   )
// });

router.post('/register', (req, res) => {
  const { name, surname, username, email, password, confirm_password } = req.body;
  if (password == confirm_password) {
    bcrypt.hash(password, 10, function (err, encryptPassword) {
      mysqlConnection.query('insert into user (name, surname, username, email, password) values (?, ?, ?, ?, ?)',
        [name, surname, username, email, encryptPassword],
        (err, rows, fields) => {
          if (!err) {
            res.json('Usuario creado correctamente');
          } else {
            res.status(401).json('Ya existe un cliente con el mismo correo electrónico o nombre de usuario');
          }
        }
      )
    });
  } else {
    res.status(401).json('Las contraseñas no coinciden');
  }
})

// router.post('/test', verifyToken, (req, res) => {
//   res.json('Informacion secreta');
// })

function verifyToken(req, res, next) {
  if (!req.headers.authorization) return res.status(401).json('La información de autenticación necesaria falta o no es válida para el recurso.');

  const token = req.headers.authorization.substr(7);
  if (token !== '') {
    const content = jwt.verify(token, 'stil');
    req.data = content;
    next();
  } else {
    res.status(401).json('Token vacio');
  }

}


// var jsonVar = {
//   id: 1,
//   name: '',
//   surname: '',
//   username: 'javierms95',
//   email: 'javier_ms95@hotmail.com',
//   password: '123456',
//   role_id: 'admin'
// }

// console.log(jsonVar);//json original

// delete jsonVar.password
// console.log(jsonVar);//json sin su elemento 


module.exports = router;