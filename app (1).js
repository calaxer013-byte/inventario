const connection = require('../config/db');

exports.crearProducto = (req, res) => {
    const producto = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        stock: req.body.stock,
        imagen: ''
    };

    connection.query("INSERT INTO productos SET ?", producto, (err) => {
        if (err) return res.status(500).send(err);
        res.send('Producto creado');
    });
};

exports.listarProductos = (req, res) => {
    connection.query("SELECT * FROM productos", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

exports.obtenerProductoPorId = (req, res) => {
    const id = req.params.id;

    connection.query("SELECT * FROM productos WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result[0]);
    });
};

exports.actualizarProducto = (req, res) => {
    const id = req.params.id;

    const producto = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        stock: req.body.stock
    };

    connection.query("UPDATE productos SET ? WHERE id = ?", [producto, id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Producto actualizado');
    });
};

exports.eliminarProducto = (req, res) => {
    const id = req.params.id;

    connection.query("DELETE FROM productos WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Producto eliminado');
    });
};