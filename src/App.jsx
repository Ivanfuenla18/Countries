import { useState, useEffect } from "react";
import servicesCountries from "./services/Countries";
import Countries from "./components/Countries";
import Filter from "./components/Filter";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  // 1. Carga inicial de datos
  useEffect(() => {
    setLoading(true);
    servicesCountries
      .getAll()
      .then((response) => {
        setCountries(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Fallo al obtener los datos del servidor:", err);
        setLoading(false);
      });
  }, []);

  // 2. Lógica de filtrado
  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase()),
  );

  const exactMatch = countriesToShow.find(
    (c) => c.name.common.toLowerCase() === filter.toLowerCase(),
  );

  const countryToDisplay =
    exactMatch || (countriesToShow.length === 1 ? countriesToShow[0] : null);

  // 3. Efecto para el historial inteligente (guarda si es exacto o si solo queda uno)
  useEffect(() => {
    if (countryToDisplay) {
      const name = countryToDisplay.name.common;
      setHistory((prevHistory) => {
        if (prevHistory.includes(name)) return prevHistory;
        return [name, ...prevHistory].slice(0, 5);
      });
    }
  }, [countryToDisplay]);

  // 4. Funciones de manejo de eventos
  const handdleShowButton = (name) => {
    setFilter(name);
  };

  const handdleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // ESTA FUNCIÓN LIMPIA TODO: TEXTO E HISTORIAL
  const handleClearEverything = () => {
    setFilter(""); // Esto limpia la caja de texto
    setHistory([]); // Esto limpia los países recientes
    <Filter value="" />;
  };

  // 5. Lógica de renderizado
  let contentToShow;

  if (loading) {
    contentToShow = <p>Cargando datos de países...</p>;
  } else if (filter === "") {
    contentToShow = <p>Escribe algo para buscar un país</p>;
  } else if (countryToDisplay) {
    contentToShow = <Countries countrie={countryToDisplay} individual={true} />;
  } else if (countriesToShow.length > 10) {
    contentToShow = <p>Demasiadas coincidencias, sé más específico</p>;
  } else if (countriesToShow.length <= 10 && countriesToShow.length >= 2) {
    contentToShow = countriesToShow.map((countrie) => (
      <Countries
        countrie={countrie}
        key={countrie.name.common}
        individual={false}
        handdleButton={() => handdleShowButton(countrie.name.common)}
      />
    ));
  } else {
    contentToShow = <p>No se han encontrado resultados</p>;
  }

  return (
    <>
      <h1>Buscador de Países</h1>
      <Filter value={filter} change={handdleFilterChange} />

      {/* SECCIÓN DE HISTORIAL */}
      {history.length > 0 && (
        <div
          style={{
            marginTop: "15px",
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "0.8rem", color: "#888" }}>
            Vistos recientemente:
          </span>
          {history.map((name) => (
            <button
              key={name}
              onClick={() => setFilter(name)}
              style={{
                padding: "4px 10px",
                fontSize: "0.75rem",
                borderRadius: "15px",
                backgroundColor: "#333",
                border: "1px solid #444",
                cursor: "pointer",
              }}
            >
              {name}
            </button>
          ))}
          {/* BOTÓN QUE LIMPIA LA CAJA Y EL HISTORIAL */}
          <button
            onClick={handleClearEverything}
            style={{
              padding: "4px 10px",
              fontSize: "0.75rem",
              borderRadius: "15px",
              backgroundColor: "transparent",
              color: "#ff4444",
              border: "1px solid #ff4444",
              cursor: "pointer",
            }}
          >
            ✕ Limpiar todo
          </button>
        </div>
      )}

      <div className="results-container">{contentToShow}</div>
    </>
  );
}

export default App;
