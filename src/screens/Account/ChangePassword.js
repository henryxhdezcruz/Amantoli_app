import React, { useState, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput, Button } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { useFormik } from "formik"
import * as Yup from "yup"
import Toast from "react-native-root-toast"
import { update_password } from "../../api/user"
import useAuth from "../../hooks/useAuth"
import { formStyle } from '../../styles'


export default function ChangePassword() {

    const { auth } = useAuth();

    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);

            try {
                const response = await update_password(auth, formData);
                if (response.statusCode) throw "Error al actualizar la contraseña";
                navigation.goBack();
            } catch (error) {
                Toast.show(error, {
                    position: Toast.positions.CENTER
                })
                formik.setFieldError("password", true);
                setLoading(false);
            }
        }
    });

    return (
        <View style={styles.container}>
            <TextInput
                label="Ingresa tu nueva Contraseña"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("password", text)}
                value={formik.values.password}
                error={formik.errors.password}
                secureTextEntry
            />
            <TextInput
                style={{ display: "none" }}
                value={formik.values.name}
            />
            <TextInput
                style={{ display: "none" }}
                value={formik.values.email}
            />

            <TextInput
                label="Confirmar contraseña"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
                secureTextEntry
            />
            <Button
                mode="contained"
                style={formStyle.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Actualizar contraseña
            </Button>
        </View>
    )
}

function initialValues() {
    return {
        password: "",
        repeatPassword: ""
    }
}

function validationSchema() {
    return {
        password: Yup.string().min(4, true).required(true),
        repeatPassword: Yup.string().min(4, true).required(true).oneOf([Yup.ref("password")])
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})
