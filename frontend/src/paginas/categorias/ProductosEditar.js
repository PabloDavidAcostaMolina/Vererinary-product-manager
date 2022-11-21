import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import { useNavigate, useParams } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke'
import swal from 'sweetalert';

const ProductosEditar = () => {

    const navigate = useNavigate();

    const { idcategoria } = useParams();
    let arreglo = idcategoria.split('@');
    const idProducto = arreglo[0];
    const nombreProducto = arreglo[1];
    const idCategoria = arreglo[2];
    const nombreCategoria = arreglo[3];
    const tituloPagina = `Edición de Productos: ${nombreCategoria}`;

    const [productos, setProductos] = useState({
        nombre: nombreProducto
    });

    const { nombre } = productos;

    useEffect(() => {
        document.getElementById("nombre").focus();
    }, [])

    const onChange = (e) => {
        setProductos({
            ...productos,
            [e.target.name]: e.target.value
        })
    }

    const editarProducto = async () => {
        let arreglo = idcategoria.split('@');
        const idProducto = arreglo[0];
        const nombreProducto = arreglo[1];
        const idCategoria = arreglo[2];
        const nombreCategoria = arreglo[3];

        const data = {
            categoria: idCategoria,
            nombre: productos.nombre,
            estado: false
        }

        const response = await APIInvoke.invokePUT(`/api/productos/${idProducto}`, data);
        const idProductoEditado = response.producto._id;

        if (idProductoEditado !== idProducto) {
            const msg = "El producto no fue editado correctamente.";
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
        } else {
            navigate(`/productos-admin/${idCategoria}@${nombreCategoria}`);
            const msg = "El producto fue editado correctamente.";
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
        }

    }

    const onSubmit = (e) => {
        e.preventDefault();
        editarProducto();
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={tituloPagina}
                    breadCrumb1={"Listado de Productos"}
                    breadCrumb2={"Edición"}
                    ruta1={`/productos-admin/${idCategoria}@${nombreCategoria}`}
                />

                <section className="content">
                    <div className="card">
                        <div className="card-header">
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

                            <form onSubmit={onSubmit}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="nombre">Nombre</label>
                                        <input type="text"
                                            className="form-control"
                                            id="nombre"
                                            name="nombre"
                                            placeholder="Ingrese el nombre del producto"
                                            value={nombre}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Editar</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default ProductosEditar;