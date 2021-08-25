import React, {useState} from "react"
import {Form, Button} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import{updateEmailApi} from "../../../api/user";

export default function ChangeEmailForm(props) {
    const {user, logout, setReloadUser}= props;
    const [loading, setloading] = useState(false);
 
    const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: Yup.object(validationSchema()),
      onSubmit: async (formData) => {
        setloading(true);
         const response = await updateEmailApi(user.id,formData.email,logout);
          if (!response || response?.statusCode === 400){
            toast.error("Error al actualizar email");
          }else{
            setReloadUser(true);
            toast.success("Email actualizado");
            // refresca formulario
            formik.handleReset();
          }
         setloading(false);

      }
    });

    return (
        <div className="change-email-form">
          <h4>Cambia tu e-mail <span>(Tu e-mail actual:{user.email} )</span></h4> 
          <Form onSubmit={formik.handleSubmit}>
              <Form.Group widths="equal">
                   <Form.Input
                     name="email"
                     placeholder="Tu nuevo e-mail"
                     onChange={formik.handleChange}
                     value={formik.values.email}
                     error={formik.errors.email}
                   />
                   <Form.Input
                     name="repeatEmail"
                     placeholder="Confirma tu nuevo e-mail"
                     onChange={formik.handleChange}
                     value={formik.values.repeatEmail}
                     error={formik.errors.repeatEmail}
                   />
              </Form.Group>
              <Button className="submit" loading={loading}>
                Actualizar
              </Button>
          </Form>
        </div>
    )
}

function initialValues(){
 return {
    email: "",
    repeatEmail:"",
 };
}


function validationSchema(){
  return {
    // oneof compara email con repeat email, el ultimo true despues de repeat podria ser un texto
    email: Yup.string()
    .email(true)
    .required(true)
    .oneOf([Yup.ref("repeatEmail")],true),
    repeatEmail: Yup.string().email(true).required(true).oneOf([Yup.ref("email")],true),
  }
}
