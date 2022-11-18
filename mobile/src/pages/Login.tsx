import { useContext, useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import AuthContext from "../context/AuthContext";

export default function Login({ navigation }): JSX.Element {
  const { setAuth, setToken } = useContext(AuthContext);
  const [text, onChangeText] = useState("");
  const [pass, onChangePass] = useState("");

  const login = () => {
    axios
      .post<{ auth: boolean; token: string | null }>(`${baseUrl}/login`, {
        data: { user: text, password: pass },
      })
      .then((res) => {
        navigation.navigate("Home");
        setAuth(res.data.auth);
        setToken(res.data.token);
      })
      .catch((err) => {
        Alert.alert("Credenciais erradas, tente novamente.");
        setAuth(false);
        setToken(null);
        console.error(err);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Faça Login como Admin</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Usuário"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePass}
          value={pass}
          placeholder="Password"
          secureTextEntry
        />
        <Button
          disabled={!text || !pass}
          onPress={login}
          title="FAZER LOGIN"
          color="#000"
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#efefef",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontWeight: "700",
    fontSize: 25,
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 6,
    borderWidth: 1,
    width: 300,
    padding: 10,
  },
});
