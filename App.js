import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotaEditor from "./src/componentes/NotaEditor";
import { Nota } from "./src/componentes/Nota";
import { useEffect, useState } from "react";
import { criaTabela } from "./src/servicos/Notas";

export default function App() {
  useEffect(() => {
    criaTabela();
  }, []);

  const [notas, setNotas] = useState([]);

  const mostrarNotas = async () => {
    const todaChaves = await AsyncStorage.getAllKeys();
    const todasNotas = await AsyncStorage.multiGet(todaChaves);
    setNotas(todasNotas);
    console.log(todasNotas);
  };

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={notas}
        keyExtractor={(nota) => nota[0]}
        renderItem={({ item, index }) => <Nota item={item} />}
      />
      <NotaEditor mostrarNotas={mostrarNotas} />
      <StatusBar />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});
