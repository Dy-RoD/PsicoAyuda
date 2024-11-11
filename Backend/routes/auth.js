const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const saltRounds = 10;
require('dotenv').config();

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
            
        }
        const user = results[0];
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        // Crear token JWT
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY, {
            expiresIn: '1h'
        });

        res.json({ 
            token, 
            userData: user.id
        });
    });
});

router.post('/registrar', (req, res) => {
    const { nombre, apellido, rut, region, correo,fono, password,tipoUsuario } = req.body;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const consulta  = 'INSERT INTO usuarios (nombre, apellido, rut, region, email,fono, password, tipoUsuario) VALUES (?,?,?,?,?,?,?,?)';
    db.query(consulta, [nombre, apellido, rut, region, correo,fono, hashedPassword, tipoUsuario], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Usuario creado exitosamente' });
    });
});

module.exports = router;
