import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CrearCuenta from './paginas/auth/CrearCuenta';
import Login from './paginas/auth/Login';
import Home from './paginas/Home';
import CategoriasAdmin from './paginas/categorias/CategoriasAdmin';
import CategoriasCrear from './paginas/categorias/CategoriasCrear';
import CategoriasEditar from './paginas/categorias/CategoriasEditar';
import ProductosAdmin from './paginas/categorias/ProductosAdmin';
import ProductosCrear from './paginas/categorias/ProductosCrear';
import ProductosEditar from './paginas/categorias/ProductosEditar';


function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login/>}/>
          <Route path="/crear-cuenta" exact element={<CrearCuenta/>}/>
          <Route path="/home" exact element={<Home/>}/>
          <Route path="/categorias-admin" exact element={<CategoriasAdmin/>}/>
          <Route path="/categorias-crear" exact element={<CategoriasCrear/>}/>
          <Route path="/categorias-editar/:idcategoria" exact element={<CategoriasEditar/>}/>
          <Route path="/productos-admin/:idcategoria" exact element={<ProductosAdmin/>}/>
          <Route path="/productos-crear/:idcategoria" exact element={<ProductosCrear/>}/>
          <Route path="/productos-editar/:idcategoria" exact element={<ProductosEditar/>}/>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
