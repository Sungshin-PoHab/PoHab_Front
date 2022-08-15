import '../assets/PartyEnroll/PartyEnroll.css';

const InputForm = (props) => {
  return <input class="input" type={props.type} name={props.data} onChange={props.handler}></input>;
};

export default InputForm;
