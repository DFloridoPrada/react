// Importar hooks
import { useState, useEffect } from 'react'
// Importar componentes
import Guitar from "./components/Guitar"
import Header from "./components/Header"

function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  
  // States 
  const [data, setData] = useState([])
  const [cart, setCart] = useState(initialCart)

  // Uso el hook useEffect para consultar la base de datos del servidor
  // Se ejecutará cuando el componente se haya cargado correctamente
  // Es bueno para consultar apis, porque no se puede saber cuanto tiempo
  // va a tardar y así te aseguras que la función se ejecute cuando el componente está listo
  useEffect(() => {
    
    const getData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/guitarras', {
          method: "GET"
        });
  
        if (response.ok) {
          const json = await response.json();
          setData(json);
        }
  
      }catch(error) {
        console.log(error);
      }
    }
  
    getData();
  }, []);

  const MIN_ITEMS = 1
  const MAX_ITEMS = 5

  // Se ejecuta cuando se modifica la variable del carrito
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item) {
    // Revisar si el item existe comparando ids
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if(itemExists >= 0 ) { // existe en el carrito
      if(cart[itemExists].quantity >= MAX_ITEMS) return
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    } else {
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function clearCart(e) {
    setCart([])
  }

  return (
    <>
    <Header 
      cart={cart}
      removeFromCart={removeFromCart}
      decreaseQuantity={decreaseQuantity}
      increaseQuantity={increaseQuantity}
      clearCart={clearCart}
    />
    
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar) => (
                <Guitar 
                  key={guitar.id}
                  guitar={guitar}
                  setCart={setCart}
                  addToCart={addToCart}
                />
            ))}
            
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
