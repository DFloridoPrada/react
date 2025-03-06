export const sayHello = () => {
    alert('Hello World');
}


export const handleChange = (e : React.ChangeEvent<HTMLInputElement>) : void => {
    console.log(e.target.value);
}