import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import AuthContext from "./src/context/AuthContext";
import { Car } from "./src/interfaces/car";
import AdminDash from "./src/pages/AdminDash";
import Home from "./src/pages/Home";
import Login from "./src/pages/Login";

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  const [auth, setAuth] = useState<boolean>(false);
  const [token, setToken] = useState<string>(null);
  const [cars, setCars] = useState<Car[]>([]);
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, token, setToken, cars, setCars }}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{ headerTitleAlign: "center" }}
            component={Home}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="AdminDash" component={AdminDash} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
