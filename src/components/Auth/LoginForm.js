import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { TextInput, Button } from "react-native-paper"
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast"
import { loginApi } from "../../api/user"
import useAuth from "../../hooks/useAuth"
import { formStyle } from "../../styles"
import { useToast } from 'react-native-fast-toast'
import { Icon } from 'react-native-elements';

export default function LoginForm(props) {

    const { changeForm } = props;

    const [loading, setLoading] = useState(false);

    const [secure, setSecure] = useState(true)

    const { login } = useAuth();

    const toast = useToast();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                //console.log(formData);
                const response = await loginApi(formData);
                if (response.statusCode) throw "Error en el usuario o contraseña";
                login(response);
                //console.log(response);
            } catch (error) {
                Toast.show(error, {
                    position: Toast.positions.CENTER,
                });
                toast.show("Error al iniciar sesión, verifique los datos", {
                    duration: 4000,
                    offset: 40,
                    animationType: 'zoom-in',
                });
                setLoading(false);
            }
        }
    });

    return (
        <View>
            <TextInput
                label="Email o Username"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("identifier", text)}
                value={formik.values.identifier}
                error={formik.errors.identifier}
            />

            <View style={{ flexDirection: "row", width: "100%", marginBottom: 20 }}>
                <TextInput
                    label="Contraseña"
                    style={[formStyle.input], { width: "100%" }}
                    onChangeText={(text) => formik.setFieldValue("password", text)}
                    value={formik.values.password}
                    error={formik.errors.password}
                    secureTextEntry={secure}
                />
                <View
                    style={{ width: "100%", position: "absolute", alignSelf: "center", alignItems: "flex-end", paddingRight: 20 }}
                >
                    <Icon
                        type='font-awesome'
                        style={{ position: "absolute", marginRight: 50 }}
                        name={secure ? "eye" : 'eye-slash'}
                        color='gray'
                        onPress={() => setSecure(!secure)}
                    />
                </View>
            </View>

            <Button
                mode="contained"
                style={formStyle.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Iniciar sesión
            </Button>

            <Button
                mode="text"
                style={formStyle.btnText}
                labelStyle={formStyle.btnTextLabel}
                onPress={changeForm}
            >
                Registrarse
            </Button>

        </View>
    )
}

function initialValues() {
    return {
        identifier: "",
        password: ""
    }
}

function validationSchema() {
    return {
        identifier: Yup.string().required(true),
        password: Yup.string().required(true),
    }
}

