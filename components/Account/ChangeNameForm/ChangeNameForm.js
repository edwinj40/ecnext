import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
// importo la funcion para poder usar el api
import { updateNameApi } from '../../../api/user';
 
 
 
export default function ChangeNameForm(props) {
 
    // desestructuro para obtener las props
    // setReloadUser es para poder cambiar el nombre en tiempo real
    const { user, logout, setReloadUser } = props;
    // console.log(user);
 
    // creo el estado para el cambio de mi icono en movimiento cuando se le de al boton de actualizar
    const [loading, setLoading] = useState(false);
 
 
 
    // constante de formik
    const formik = useFormik({
        // para cargar los valores
        initialValues: initialValues(user.name, user.lastname),
        // para validar los valores
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            // console.log(formData);
            // cambio el valor de mi estado a true
            setLoading(true);
            const response = await updateNameApi(user.id, formData, logout);
            // console.log(response);
 
            // si response es null
            if (!response == null) {
                toast.error("Error al actualizar el nombre y apellidos");
            } else {
                setReloadUser(true);
                toast.success("Nombre y apellidos actualizados correctamente");
            }
            // cambio el valor de mi estado a true
            setLoading(false);
        },
    });
 
    return (
        <div className="change-name-form">
            <h4>Cambia tu nombre y apellidos</h4>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group widths="equal">
                    <Form.Input
                        name="name"
                        placeholder="Tu nuevo nombre"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={formik.errors.name} />
                    <Form.Input
                        name="lastname"
                        placeholder="Tus nuevos apellidos"
                        onChange={formik.handleChange}
                        value={formik.values.lastname}
                        error={formik.errors.lastname} />
                </Form.Group>
                <Button type="submit" className="submit" loading={loading}>Actualizar</Button>
            </Form>
        </div>
    )
}
 
function initialValues(name, lastname) {
    return {
        // || por si el nombre esta vacio
        name: name || "",
        lastname: lastname || ""
    };
}
 
function validationSchema() {
    return {
        name: Yup.string().required(true),
        lastname: Yup.string().required(true),
    };
}