import { db } from "./SQLite";

export const criaTabela = () => {
  db.transaction((transaction) => {
    transaction.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        "Notas " +
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);"
    );
  });
};

export const adicionaNota = async (nota) => {
  //Estamos criando um Promise, pois o transaction() não retorna nenhum tipo de resultado ou promessa.
  //Por isso usamos a Promise com o intuito de ao concluir a execução do código enviar um feedback para o usuário.
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "INSERT INTO Notas (titulo, categoria, texto) VALUES (?, ?, ?);",
        [nota.titulo, nota.categoria, nota.texto],
        () => {
          resolve("Nota adiocionada com Sucesso!");
        }
      );
    });
  });
};

export const buscaNotas = async () => {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM Notas;",
        [],
        (transaction, resultado) => {
          resolve(resultado.rows._array);
        }
      );
    });
  });
};

export const atualizaNota = async (nota) => {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "UPDATE Notas SET titulo = ?, categoria = ?, texto = ? WHERE id = ?;",
        [nota.titulo, nota.categoria, nota.texto, nota.id],
        () => {
          resolve("Nota atualizada com Sucesso!");
        }
      );
    });
  });
};

export const deletaNota = async (nota) => {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "DELETE FROM Notas WHERE id = ?;",
        [nota.id],
        () => {
          resolve("Nota deletada com Sucesso!");
        }
      );
    });
  });
};
