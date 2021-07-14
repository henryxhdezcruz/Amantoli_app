import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import StatusBar from "../components/StatusBar";
import NotProducts from "../components/Cart/NotProducts";
import ProductList from "../components/Cart/ProductList";
//import AddressList from "../components/Cart/AddressList";
//import Payment from "../components/Cart/Payment";
import { getProductCartApi } from "../api/cart";
import { getAddressesApi } from "../api/address";
import useAuth from "../hooks/useAuth";
import ScreenLoading from "../components/ScreenLoading";
import colors from "../styles/colors";

export default function Cart() {

    const [cart, setCart] = useState(null);

    useFocusEffect(
        useCallback(() => {
            setCart(null);
            loadCart();
          //loadAddresses();
        }, [])
    );

    const loadCart = async () => {
        const response = await getProductCartApi();
        setCart(response);
    };

    return (
        <>
            <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
            {!cart ? (
                <ScreenLoading size="large" text="Cargando carrito"/>
            ) : size(cart) === 0 ? (
                <NotProducts/>
            ) : (
                <KeyboardAwareScrollView extraScrollHeight={25}>
                    <ScrollView style={styles.cartContainer}>
                    <ProductList
                        cart={cart}
                        /*products={products}
                        setProducts={setProducts}
                        setReloadCart={setReloadCart}
                        setTotalPayment={setTotalPayment}*/
                    />
                    </ScrollView>
                </KeyboardAwareScrollView>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    cartContainer: {
      padding: 10,
    },
    reload: {
      backgroundColor: "#000",
      position: "absolute",
      width: "100%",
      height: "100%",
      opacity: 0.3,
      alignItems: "center",
      justifyContent: "center",
    },
    reloadText: {
      marginTop: 10,
      color: "#fff",
    },
});
  