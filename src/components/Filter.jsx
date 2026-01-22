const Filter = ({ change, value }) => {
  return (
    <>
      <h3>Busca el nombre de un pais (En ingles)</h3>
      <input type="text" value={value} onChange={change}></input>
    </>
  );
};
export default Filter;
