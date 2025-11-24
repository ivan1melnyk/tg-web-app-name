import './Button.css';


const Button = (props) => {
    return (
        <button {...props} className={'button' + props.className}>Close</button>
    )
};


export default Button;