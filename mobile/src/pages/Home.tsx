import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import Card from "../components/Card";
import AuthContext from "../context/AuthContext";
import { Car } from "../interfaces/car";

export default function Home({ navigation }): JSX.Element {
  const { auth, setAuth, setToken, setCars, cars } = useContext(AuthContext);
  function getCars() {
    axios
      .get<{ cars: Car[] }>(`${baseUrl}/list`)
      .then((res) => {
        setCars(res.data.cars);
      })
      .catch((err) => {
        Alert.alert("Não foi possível carregar os carros, tente mais tarde.");
        console.error(err);
      });
  }
  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        auth ? (
          <Button
            title="Logout"
            color="#000"
            onPress={() => {
              setAuth(false);
              setToken(null);
            }}
          />
        ) : (
          <Button
            title="Login"
            color="#000"
            onPress={() => navigation.navigate("Login")}
          />
        ),
      headerLeft: () =>
        auth && (
          <Button
            title="Admin Dash"
            color="#000"
            onPress={() => navigation.navigate("AdminDash")}
          />
        ),
    });
    getCars();
  }, [auth]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Carros disponíveis para venda</Text>
        {cars
          ?.sort((a, b) => b.preco - a.preco)
          .map((d) => (
            <Card data={d} key={d.id} />
          ))}
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#efefef",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 30,
  },
  title: {
    fontWeight: "700",
    fontSize: 25,
    marginBottom: 20,
  },
});
