import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import axios from "axios";
import { Table, Row, Rows } from "react-native-table-component";
import { baseUrl } from "../utils/baseUrl";
import AuthContext from "../context/AuthContext";
import { Car } from "../interfaces/car";

export default function AdminDash({ navigation }): JSX.Element {
  const { setAuth, setToken, token, setCars } = useContext(AuthContext);
  const [nome, onChangeNome] = useState("");
  const [marca, onChangeMarca] = useState("");
  const [modelo, onChangeModelo] = useState("");
  const [preco, onChangePreco] = useState("");
  const [foto, onChangeFoto] = useState("");
  const [data, setData] = useState([]);
  const [editId, onChangeEditId] = useState("");
  const [editNome, onChangeEditNome] = useState("");
  const [editMarca, onChangeEditMarca] = useState("");
  const [editModelo, onChangeEditModelo] = useState("");
  const [editPreco, onChangeEditPreco] = useState("");
  const [editFoto, onChangeEditFoto] = useState("");
  const [excludeId, onChangeExcludeId] = useState("");

  const getCars = () => {
    axios
      .get<{ cars: Car[] }>(`${baseUrl}/list`)
      .then((res) => {
        setCars(res.data.cars);
        setData(
          res.data.cars.map((c) => [c.id, c.nome, c.marca, c.modelo, c.preco])
        );
      })
      .catch((err) => {
        Alert.alert("Não foi possível carregar os carros, tente mais tarde.");
        console.error(err);
      });
  };

  useEffect(() => {
    getCars();
  }, []);

  const createCar = () => {
    axios
      .post(
        `${baseUrl}/create`,
        { data: { nome, marca, modelo, preco: Number(preco), foto } },
        { headers: { x_access_token: token } }
      )
      .then((_) => {
        Alert.alert("Carro criado com sucesso.");
        getCars();
      })
      .catch((err) => {
        if ([401, 500].includes(err.response.status)) {
          setAuth(false);
          setToken(null);
          navigation.navigate("Home");
          Alert.alert("Sua sessão expirou, faça login novamente.");
        } else {
          Alert.alert("Não foi possível criar o carro.");
        }
        console.error(err);
      });
  };

  const editCar = () => {
    axios
      .put(
        `${baseUrl}/update`,
        {
          data: {
            nome: editNome,
            marca: editMarca,
            modelo: editModelo,
            preco: Number(editPreco),
            foto: editFoto,
          },
          id: Number(editId),
        },
        { headers: { x_access_token: token } }
      )
      .then((_) => {
        Alert.alert("Carro editado com sucesso.");
        getCars();
      })
      .catch((err) => {
        if ([401, 500].includes(err.response.status)) {
          setAuth(false);
          setToken(null);
          navigation.navigate("Home");
          Alert.alert("Sua sessão expirou, faça login novamente.");
        } else {
          Alert.alert("Não foi possível editar o carro.");
        }
        console.error(err);
      });
  };

  const excludeCar = () => {
    axios
      .delete(`${baseUrl}/exclude/${excludeId}`, {
        headers: { x_access_token: token },
      })
      .then((_) => {
        Alert.alert("Carro excluído com sucesso.");
        getCars();
      })
      .catch((err) => {
        if ([401, 500].includes(err.response.status)) {
          setAuth(false);
          setToken(null);
          navigation.navigate("Home");
          Alert.alert("Sua sessão expirou, faça login novamente.");
        } else {
          Alert.alert("Não foi possível excluir o carro.");
        }
        console.error(err);
      });
  };

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => Keyboard.dismiss()}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.subTitle}>Listagem de carros</Text>
        <View style={styles.tableContainer}>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
            <Row
              data={["Id", "Nome", "Marca", "Modelo", "Preço"]}
              style={styles.head}
              textStyle={styles.text}
            />
            <Rows data={data} textStyle={styles.text} />
          </Table>
        </View>

        <Text style={styles.subTitle}>Cadastrar novo carro</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNome}
          value={nome}
          placeholder="Nome"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeMarca}
          value={marca}
          placeholder="Marca"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeModelo}
          value={modelo}
          placeholder="Modelo"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangePreco(text.replace(/[^0-9]/g, ""))}
          value={preco}
          placeholder="Preço"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeFoto}
          value={foto}
          placeholder="Url da Foto"
        />
        <Button
          disabled={!nome || !marca || !modelo || !preco || !foto}
          onPress={createCar}
          title="CADASTRAR CARRO"
          color="#000"
        />

        <Text style={{ marginTop: 20, ...styles.subTitle }}>Editar carro</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeEditId(text.replace(/[^0-9]/g, ""))}
          value={editId}
          placeholder="Id do carro a ser editado"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeEditNome}
          value={editNome}
          placeholder="Nome"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeEditMarca}
          value={editMarca}
          placeholder="Marca"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeEditModelo}
          value={editModelo}
          placeholder="Modelo"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) =>
            onChangeEditPreco(text.replace(/[^0-9]/g, ""))
          }
          value={editPreco}
          placeholder="Preço"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeEditFoto}
          value={editFoto}
          placeholder="Url da Foto"
        />
        <Button
          disabled={
            !editId ||
            !editNome ||
            !editMarca ||
            !editModelo ||
            !editPreco ||
            !editFoto
          }
          onPress={editCar}
          title="EDITAR CARRO"
          color="#000"
        />
        <Text style={{ marginTop: 20, ...styles.subTitle }}>Excluir carro</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) =>
            onChangeExcludeId(text.replace(/[^0-9]/g, ""))
          }
          value={excludeId}
          placeholder="Id do carro a ser excluído"
          keyboardType="numeric"
        />
        <Button
          disabled={!excludeId}
          onPress={excludeCar}
          title="EXCLUIR CARRO"
          color="#000"
        />
        <View style={{ width: "100%", height: 80 }} />
      </ScrollView>
    </TouchableWithoutFeedback>
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
  subTitle: {
    fontWeight: "700",
    fontSize: 18,
  },
  input: {
    height: 40,
    margin: 6,
    borderWidth: 1,
    width: 300,
    padding: 10,
  },
  tableContainer: {
    margin: 10,
    backgroundColor: "#fff",
    width: "95%",
    marginBottom: 30,
  },
  head: { height: 40, backgroundColor: "#c5c5c5" },
  text: { margin: 6, fontSize: 10 },
});
