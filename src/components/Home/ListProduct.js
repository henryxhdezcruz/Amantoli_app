import React from 'react'
import { Image, View, Text, StyleSheet, Alert, TouchableWithoutFeedback } from 'react-native'
import { Button } from "react-native-paper"
import { map } from "lodash"
import { useNavigation } from "@react-navigation/native"
import useAuth from "../../hooks/useAuth"
import colors from "../../styles/colors"
import { API_URL } from "../../utils/constants"

export default function ListProduct(props) {

    const { products } = props;

    const navigation = useNavigation();

    const goToProduct = (id) => {
        navigation.push("product", { idProduct: id })
    }

    return (
        <View style={styles.container}>
            {map(products, (product) => (
                <TouchableWithoutFeedback
                    key={product.id}
                    onPress={() => goToProduct(product.id)}
                >
                    <View style={styles.containerProduct}>
                        <View style={styles.product}>
                            <Image
                                style={styles.image}
                                source={{
                                    uri: `${API_URL}${product.main_image.url}`
                                }}
                            />
                            <Text
                                style={styles.name}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {product.title}
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        margin: -3,
    },
    title: {
        fontWeight: "bold",
        paddingBottom: 5
    },
    containerProduct: {
        width: "50%",
        padding: 3,
    },
    product: {
        backgroundColor: "#dadde1",
        padding: 8,
        borderRadius: 5
    },
    image: {
        height: 150,
        resizeMode: "contain"
    },
    name: {
        marginTop: 15,
        fontSize: 16
    }
})