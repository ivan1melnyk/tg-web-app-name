
const Button = (props) => {
    return (
        <button {...props} className={'button' + props.className}>Click Me</button>
    )
};


export default Button;