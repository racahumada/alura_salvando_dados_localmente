import {
  TouchableOpacity,
  Modal,
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

export default function Button({
  categoriaSelecionada,
  setCategoriaSelecionada,
}) {
  const { width } = useWindowDimensions();
  const [modalVisivel, setModalVisivel] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={estilos.container}
        onPress={() => setModalVisivel(true)}
      >
        <Text>{categoriaSelecionada}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => {
          setModalVisivel(false);
        }}
      >
        <View style={estilos.centeredView}>
          <View style={estilos.modalView}>
            <Picker
              style={{ width: width * 0.9 }}
              selectedValue={categoriaSelecionada}
              onValueChange={(novaCategoria) => {
                setCategoriaSelecionada(novaCategoria);
                setModalVisivel(false);
              }}
            >
              <Picker.Item label="Todos" value="Todos" />
              <Picker.Item label="Pessoal" value="Pessoal" />
              <Picker.Item label="Trabalho" value="Trabalho" />
              <Picker.Item label="Outros" value="Outros" />
            </Picker>
          </View>
        </View>
      </Modal>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: "#ffffff",
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#c4c4c4",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
