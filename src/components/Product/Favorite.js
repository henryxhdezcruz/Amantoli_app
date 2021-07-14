import React, { useState, useEffect } from "react";
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'
import { Icon } from 'react-native-elements'
import { size } from "lodash";
import useAuth from "../../hooks/useAuth";
import { useToast } from 'react-native-fast-toast'
import {
    addFavoriteApi,
    isFavoriteApi,
    deleteFavoriteApi,
} from "../../api/favorite";

export default function Favorite(props) {

    const { product } = props;

    const [isFavorite, setIsFavorite] = useState(undefined);

    const [loading, setLoading] = useState(false);

    const { auth } = useAuth();

    const toast = useToast();

    useEffect(() => {
        (async () => {
            const response = await isFavoriteApi(auth, product.id);
            if (size(response) === 0) setIsFavorite(false);
            else setIsFavorite(true);
        })();
    }, [product]);

    const addFavorite = async () => {
        if (!loading) {
            setLoading(true);
            try {
                await addFavoriteApi(auth, product.id);
                setIsFavorite(true);
                toast.show("Producto añadido a favoritos", {
                    duration: 4000,
                    offset: 40,
                    animationType: 'zoom-in',
                });
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
    }

    const deleteFavorite = async () => {
        if (!loading) {
            setLoading(true);
            try {
                await deleteFavoriteApi(auth, product.id);
                setIsFavorite(false);
                toast.show("Producto eliminado de favoritos", {
                    duration: 4000,
                    offset: 40,
                    animationType: 'zoom-in',
                });
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
    }

    if (isFavorite === undefined) return null;

    return (
        <View style={{ zIndex: 1 }} >
            <Icon
                raised
                //reverse
                name='heart'
                type='ionicon'
                color={isFavorite ? '#f50' : "#E2E8F0"}
                onPress={isFavorite ? deleteFavorite : addFavorite}
                disabled={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    btnAddFavoritesContent: {
        backgroundColor: "#E2E8F0",
        paddingVertical: 5
    },
    btnLabel: {
        fontSize: 18,
        color: "white"
    },
    btn: {
        marginTop: 20
    }
})
/*
<Button
                mode="contain"
                contentStyle={styles.btnAddFavoritesContent}
                labelStyle={styles.btnLabel}
                style={styles.btn}
                onPress={addFavorite}
            >
                Añadir a favoritos
            </Button>*/