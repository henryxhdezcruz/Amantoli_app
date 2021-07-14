import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { useFocusEffect } from "@react-navigation/native"
import Search from "../../components/Search"
import NewProducts from '../../components/Home/NewProducts'
import ScreenLoading from "../../components/ScreenLoading"
import StatusBar from "../../components/StatusBar"
import Banner from '../../components/Home/Banner'
import colors from '../../styles/colors'

export default function Home() {
    return (
        <>
        <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
            <Search />
            <ScrollView>
                <Banner />
                <NewProducts />
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})