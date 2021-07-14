import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper';
//import Toast from 'react-native-root-toast';
import { useToast } from 'react-native-fast-toast'
import { addProductCartApi } from '../../api/cart';
import { Icon } from 'react-native-elements'

export default function Buy(props) {

    const { product, quantity } = props;

    const toast = useToast();

    const addProductCart = async () => {
        const response = await addProductCartApi(product.id, quantity);
        if (response) {
            //toast.show("Producto añadido al carrito")
            toast.show("Producto añadido a la bolsa", {
                //type: 'success',
                position: 'top',
                duration: 4000,
                offset: 40,
                animationType: 'zoom-in',
            });
        } else {
            toast.show("ERROR al añadir el producto al carrito", {
                position: 'top',
                duration: 4000,
                offset: 40,
                animationType: 'zoom-in',
            });
        }
    };

    return (
        <View style={{ zIndex: 1 }}>
            <Button
                mode="contained"
                contentStyle={styles.btnBuyContent}
                labelStyle={styles.btnLabel}
                style={styles.btn}
                onPress={addProductCart}
            >
                Agregar a la bolsa
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    btnBuyContent: {
        backgroundColor: "#164E63",
        paddingVertical: 5
    },
    btnLabel: {
        fontSize: 18,
    },
    btn: {
        marginTop: 20
    }
})