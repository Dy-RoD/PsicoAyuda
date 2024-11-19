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
        const token = jwt.sign({ id: user.id, username: user.username, tipoUsuario: user.tipoUsuario }, process.env.SECRET_KEY, {
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

// Ruta para verificar usuario por RUT y correo
router.post('/recover', async (req, res) => {
    const { rut, email } = req.body;

    // Validar que los campos RUT y correo estén presentes y no estén vacíos
    if (!rut || !email) {
        return res.status(400).json({ error: 'RUT y correo son obligatorios' });
    }

    try {
        // Ejecutar la consulta
        db.query('SELECT id FROM usuarios WHERE rut =? AND email =?', [rut, email], async (err, results) => {
            if (err) throw err;
            if (results.length === 0) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            const userId = results[0].id;
            res.json({ success: true, userId });
        });
    } catch (error) {
        console.error('Error al verificar usuario:', error);
        return res.status(500).json({ error: 'Error del servidor' });
    }
});


router.post('/changePass', async (req, res) => {
    const { userId, nuevaContrasena } = req.body;

    if (!nuevaContrasena) {
        return res.status(400).json({ error: 'La nueva contraseña es obligatoria' });
    }

    try {
        // Hashear la nueva contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(nuevaContrasena, salt);

        // Actualizar la contraseña en la base de datos
        const query = 'UPDATE usuarios SET password = ? WHERE id = ?';
        await connection.execute(query, [hashedPassword, userId]);

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error al cambiar contraseña:', error);
        return res.status(500).json({ error: 'Error del servidor' });
    }
});

module.exports = router;
