import { StatusBar } from "expo-status-bar";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { Car } from "../interfaces/car";

export default function Card({ data }: { data: Car }): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.nome}</Text>
      <Text style={styles.smallTitle}>{data.marca}</Text>
      <Text style={styles.priceTitle}>
        {data.preco.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </Text>
      <Image style={styles.image} source={{ uri: data.foto }} />
      <Button title="COMPRAR" color={"#000000"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#adadad",
    alignItems: "center",
    justifyContent: "flex-start",
    width: 300,
    heigth: 400,
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontWeight: "600",
    fontSize: 20,
  },
  smallTitle: {
    fontWeight: "500",
    fontSize: 15,
  },
  priceTitle: {
    fontWeight: "600",
    fontSize: 18,
  },
  image: {
    width: 280,
    height: 180,
    margin: 10,
    borderRadius: 5,
  },
});
