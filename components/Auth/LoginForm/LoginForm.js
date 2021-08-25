import React, {useState} from 'react';
import {Form, Button} from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { loginApi, resetPasswordApi } from "../../../api/user";
// import { apiResolver } from 'next/dist/next-server/server/api-utils';

export default function LoginForm(props) {
    const {showRegisterForm, onCloseModal} = props;
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
          setLoading(true);
          const response = await loginApi(formData);
          if (response?.jwt) {
            // login de applicationCache.js
            login(response.jwt);
            onCloseModal();
          } else {
            toast.error("El email o la contraseña son incorrectos");
          }
          setLoading(false);
        },
      });

      // si a olvidado contraseña
      const resetPassword = () => {
        formik.setErrors({});
        const validateEmail = Yup.string().email().required();
        // entre () esel valor del email
        if (!validateEmail.isValidSync(formik.values.identifier)) {
          formik.setErrors({ identifier: true });
        } else {
          // esta funcion viene de apiResolver.js
          resetPasswordApi(formik.values.identifier);
        }
      };
      // fin de resetpassword  



    return (
      <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="Correo electronico"
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button type="button" basic onClick={showRegisterForm}>
          Registrarse
        </Button>
        <div>
          <Button className="submit" type="submit" loading={loading}>
            Entrar
          </Button>
          <Button type="button" onClick={resetPassword}>
            ¿Has olvidado la contraseña?
          </Button>
        </div>
      </div>    


      </Form>
    );
}


function initialValues() {
    return {
      identifier: "",
      password: "",
    };
  }
  
  function validationSchema() {
    return {
      identifier: Yup.string().email(true).required(true),
      password: Yup.string().required(true),
    };
  }
  
