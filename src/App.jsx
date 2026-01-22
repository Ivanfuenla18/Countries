import { useState, useEffect } from "react";
import servicesCountries from "./services/Countries";
import Countries from "./components/Countries";
import Filter from "./components/Filter";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

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

  const handdleShowButton = (name) => {
    setFilter(name);
  };

  const handdleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // 1. Primero filtramos todos los que coinciden parcialmente
  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase()),
  );

  // 2. LÓGICA DE COINCIDENCIA EXACTA (Solución para Amparo)
  // Buscamos si entre los filtrados hay uno que se llame EXACTAMENTE como lo escrito
  const exactMatch = countriesToShow.find(
    (c) => c.name.common.toLowerCase() === filter.toLowerCase(),
  );

  let contentToShow;

  if (loading) {
    contentToShow = <p>Cargando datos de países...</p>;
  } else if (filter === "") {
    contentToShow = <p>Escribe algo para buscar un país</p>;
  }
  // Si hay una coincidencia exacta, mandamos ese país directamente (individual={true})
  else if (exactMatch) {
    contentToShow = <Countries countrie={exactMatch} individual={true} />;
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
  } else if (countriesToShow.length === 1) {
    contentToShow = (
      <Countries countrie={countriesToShow[0]} individual={true} />
    );
  } else {
    contentToShow = <p>No se han encontrado resultados</p>;
  }

  return (
    <>
      <h1>Buscador de Países</h1>
      <Filter value={filter} change={handdleFilterChange} />
      <div className="results-container">{contentToShow}</div>
    </>
  );
}

export default App;
