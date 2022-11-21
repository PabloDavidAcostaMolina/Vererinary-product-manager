const mongoose = require("mongoose");

const ProductoSchema = mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  estado: { type: Boolean, default: false },
  creado: { type: Date, default: Date.now() },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria" },
});

module.exports = mongoose.model("Producto", ProductoSchema);
