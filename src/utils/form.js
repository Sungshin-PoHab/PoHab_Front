import '../assets/PartyEnroll/PartyEnroll.css';

const InputForm = (props) => {
  return <input class="J_input" type={props.type} name={props.data} onChange={props.handler}></input>;
};

export default InputForm;
