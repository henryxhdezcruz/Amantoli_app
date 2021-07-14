import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { map } from "lodash";
import ScreenLoading from "../ScreenLoading";
import { getProductApi } from "../../api/product";

export default function ProductList(props) {
    const { cart } = props;

    useEffect(() => {
        (async() => {
            const productTemp = [];

            for await (const product of cart){
                const response = await getProductApi(product.idProduct);
                response.quantity = product.quantity;
                productTemp.push(response);
            }

            console.log(productTemp[0].title);
            console.log(productTemp[0].quantity);
        })
    }, [])

    return (
        <View>
            <Text>Product List</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
      fontSize: 18,
      fontWeight: "bold",
    },
  });