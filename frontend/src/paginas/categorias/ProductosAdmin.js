import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../utils/APIInvoke'
import swal from 'sweetalert';

const ProductosAdmin = () => {

    const [productos, setProductos] = useState([]);

    const { idcategoria } = useParams();
    let arreglo = idcategoria.split('@');
    const idCategoria = arreglo[0];
    const nombreCategoria = arreglo[1];
    const tituloPagina = `Listado de Productos: ${nombreCategoria}`;

    const cargarProductos = async () => {
        const response = await APIInvoke.invokeGET(`/api/productos?categoria=${idCategoria}`);

        setProductos(response.productos);
    }

    useEffect(() => {
        cargarProductos();
    }, [])

    const eliminarProducto = async (e, idProducto, idCategoria) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/productos/${idProducto}?categoria=${idCategoria}`);

        if (response.msg === 'Producto eliminado') {
            const msg = "El producto fue borrado correctamente.";
            swal({
                title: 'Información',
                text: msg,
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-primary',
                        closeModal: true
                    }
                }
            });
            cargarProductos();
        } else {
            const msg = "El producto no fue borrado correctamente.";
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        }

    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={tituloPagina}
                    breadCrumb1={"Listado de Categorias"}
                    breadCrumb2={"Productos"}
                    ruta1={"/categorias-admin"}
                />

                <section className="content">

                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title"><Link to={`/productos-crear/${idcategoria}`} className="btn btn-block btn-primary btn-sm">Crear Producto</Link></h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10%' }}>Id</th>
                                        <th style={{ width: '75%' }}>Nombre</th>
                                        <th style={{ width: '15%' }}>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productos.map(
                                            item =>
                                                <tr key={item._id}>
                                                    <td>{item._id}</td>
                                                    <td>{item.nombre}</td>
                                                    <td>
                                                        <Link to={`/productos-editar/${item._id}@${item.nombre}@${item.categoria}@${nombreCategoria}`} className="btn btn-sm btn-primary">Editar</Link>&nbsp;&nbsp;
                                                        <button onClick={(e) => eliminarProducto(e, item._id, item.categoria)} className="btn btn-sm btn-danger">Borrar</button>
                                                    </td>
                                                </tr>
                                        )
                                    }

                                </tbody>
                            </table>

                        </div>
                    </div>

                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default ProductosAdmin;