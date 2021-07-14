import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Price(props) {

    const { price, discount } = props;

    const calcPrice = (price, discount) => {
        if(!discount) return price;

        const discountAmout = (price * discount) / 100;
        return (price - discountAmout).toFixed(2)
    }

    return (
        <View>
            {discount && (
                <View style={styles.containerData}>
                    <Text style={styles.dataText}>Precio recomendado: </Text>
                    <Text style={[styles.dataValue, styles.oldPrice]}>${price} pesos</Text>
                </View>
            )}

            <View style={styles.containerData}>
                <Text style={styles.dataText}>Precio: </Text>
                <Text style={[styles.dataValue, styles.currentPrice]}>${calcPrice(price, discount)} pesos</Text>
            </View>

            {discount && (
                <View style={styles.containerData}>
                    <Text style={styles.dataText}>Ahorras: </Text>
                    <Text style={[styles.dataValue, styles.saving]}>${((price * discount) / 100).toFixed(2)} pesos ({discount}%)</Text>
                </View>
            )}

        </View>

        
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 50
    },
    dataText: {
        width: "45%",
        fontSize: 18,
        color: "#747474",
        textAlign: "right"
    },
    dataValue: {
        width: "55%",
        fontSize: 18,
        paddingLeft: 5
    },
    containerData: {
        paddingVertical: 5,
        flexDirection: "row",
        alignItems: "center"
    },
    oldPrice: {
        textDecorationLine: "line-through"
    },
    currentPrice: {
        fontSize: 23,
        color: "#EF4444"
    },
    saving: {
        color: "#EF4444"
    }
})