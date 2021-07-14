import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function ResultNotFound(props) {
    const { search } = props;
    return (
        <View style={styles.container}>
            <Text  style={styles.searchText}>No se encontraron productos relacionados con {search}.</Text>
            <Text  style={styles.otherText}>Revisa la ortografía o usa terminos mas generales.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    searchText: {
      fontSize: 18,
      fontWeight: "bold",
    },
    otherText: {
      fontSize: 14,
      paddingTop: 5,
    },
  });
  