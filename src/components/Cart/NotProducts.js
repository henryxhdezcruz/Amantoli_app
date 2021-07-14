import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function NotProducts() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No tienes productos añadidos en la bolsa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 16,
  },
});
