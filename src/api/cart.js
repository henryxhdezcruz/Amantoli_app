import AsyncStorage from "@react-native-async-storage/async-storage";
import { size, map, filter } from "lodash";
import { CART, API_URL } from "../utils/constants";

export async function getProductCartApi() {
  //await AsyncStorage.removeItem(CART);
  try {
    const cart = await AsyncStorage.getItem(CART);
    if (!cart) return [];
    return JSON.parse(cart);
  } catch (e) {
    return null;
  }
}

export async function addProductCartApi(idProduct, quantity) {
  try {
    const cart = await getProductCartApi();

    if (size(cart) === 0) {
      cart.push({
        idProduct,
        quantity,
      });
    } else {
      let found = false;

      map(cart, (product) => {
        if (product.idProduct === idProduct) {
          product.quantity += quantity;
          found = true;
          return product;
        }
      });

      if (!found) {
        cart.push({
          idProduct,
          quantity,
        });
      }
    }

    await AsyncStorage.setItem(CART, JSON.stringify(cart));
    return true;
  } catch (e) {
    return false;
  }
}