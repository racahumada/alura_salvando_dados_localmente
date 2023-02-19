import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import NotaEditor from "./src/componentes/NotaEditor";
import { Nota } from "./src/componentes/Nota";
import { useEffect, useState } from "react";
import { buscaNotas, criaTabela } from "./src/servicos/Notas";
import Button from "./src/componentes/Button";

export default function App() {
  useEffect(() => {
    criaTabela();
    mostrarNotas();
  }, []);

  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [notaSelecionada, setNotaSelecionada] = useState({});
  const [notas, setNotas] = useState([]);

  const mostrarNotas = async () => {
    const todasNotas = await buscaNotas();
    setNotas(todasNotas);
    console.log(todasNotas);
  };

  return (
    <SafeAreaView style={estilos.container}>
      <Button
        categoriaSelecionada={categoriaSelecionada}
        setCategoriaSelecionada={setCategoriaSelecionada}
      />
      <FlatList
        data={notas}
        keyExtractor={(nota) => nota.id}
        renderItem={({ item, index }) => (
          <Nota item={item} setNotaSelecionada={setNotaSelecionada} />
        )}
      />
      <NotaEditor
        mostrarNotas={mostrarNotas}
        notaSelecionada={notaSelecionada}
        setNotaSelecionada={setNotaSelecionada}
      />
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
