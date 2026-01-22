const Filter = ({ change }) => {
  return (
    <>
      <h3>Busca el nombre de un pais (En ingles)</h3>
      <input type="text" onChange={change}></input>
    </>
  );
};
export default Filter;
