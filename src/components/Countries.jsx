import CountrieInfo from "./CountrieInfo";

const Countries = ({ countrie, individual, handdleButton }) => {
  if (individual) {
    return <CountrieInfo countrie={countrie} />;
  }

  return (
    <div className="pa">
      <strong>{countrie.name.common}</strong>{" "}
      <button onClick={handdleButton}> Mostrar</button>
    </div>
  );
};
export default Countries;
