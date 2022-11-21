const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//crear producto
//api/productos

router.post(
  "/",
  auth,
  [check("nombre", "Nombre es obligatorio").not().isEmpty()],
  productoController.crearProducto
);

router.get("/", auth, productoController.obtenerProductos);

router.put("/:id", auth, productoController.actualizarProducto);

router.delete('/:id',auth,productoController.eliminarProducto);

module.exports = router;
