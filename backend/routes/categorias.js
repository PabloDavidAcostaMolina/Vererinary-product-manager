const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriasController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//crea categorias
// api/categorias
router.post(
  "/",
  auth,
  [check("nombre", "El nombre de la categoria es obligatorio").not().isEmpty()],
  categoriaController.crearCategoria
);

// Obtener categorias

router.get("/", auth, categoriaController.obtenerCategorias);

//Actualizar categoria vía ID
router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre de la categoria es obligatorio").not().isEmpty()],
  categoriaController.actualizarCategoria
);

//Eliminar una categoria
router.delete(
  "/:id",
  auth,
  categoriaController.eliminarCategoria
);


module.exports = router;
