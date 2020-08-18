import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  const loadDataAll = async () => {
    const response = await api.get("/repositories");

    setRepositories(response.data);
  };

  useEffect(() => {
    loadDataAll();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: "Name - " + Date.now(),
      url: "https://github.com/GustavoDev764",
      techs: ["NodeJs", "TypeScript", "React", "React Native"],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((item, index) => {
          return (
            <li key={index}>
              {item.title}
              <button onClick={() => handleRemoveRepository(item.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
