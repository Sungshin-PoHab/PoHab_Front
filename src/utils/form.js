const InputForm = (props) => {
  return (
    <input type={props.type} name={props.data} onChange={props.handler}></input>
  );
};

export default InputForm;
