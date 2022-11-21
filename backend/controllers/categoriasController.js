const Categoria = require("../models/Categoria");
const { validationResult } = require("express-validator");

exports.crearCategoria = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(401).json({ errores: errores.array() });
  }

  try {
    //crear un nueva categoria
    const categoria = new Categoria(req.body);

    categoria.creador = req.usuario.id;

    categoria.save();
    res.json(categoria);
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find({ creador: req.usuario.id }).sort({
      creado: -1,
    });
    res.json({ categorias });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.actualizarCategoria = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(401).json({ errores: errores.array() });
  }

  const { nombre } = req.body;
  const nuevoCategoria = {};

  if (nombre) {
    nuevoCategoria.nombre = nombre;
  }

  try {
    let categoria = await Categoria.findById(req.params.id);

    if (!categoria) {
      return res.status(400).json({ msg: "Categoria no encontrada" });
    }

    if (categoria.creador.toString() !== req.usuario.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    categoria = await Categoria.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoCategoria },
      { new: true }
    );

    res.json({ categoria });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.eliminarCategoria = async (req, res) => {
  try {
    let categoria = await Categoria.findById(req.params.id);

    if (!categoria) {
      return res.status(400).json({ msg: "Categoria no encontrada" });
    }

    if (categoria.creador.toString() !== req.usuario.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    await Categoria.remove({ _id: req.params.id });
    res.json({ msg: "Categoria eliminada" });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
