import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import MultiActionAreaCard from './Card'

function App() {
  const [count, setCount] = useState(0)
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [cart, setCart] = useState([])

  useEffect(()=> {
    async function fetchData() {
      try{
      const data = await axios.get(`https://dummyjson.com/products/search?q=${search}`)
      setData(data.data.products)
      }
      catch(err){
        alert("There is no product" + err)
      }
    }
    
    fetchData()
  },[search])

    const handleCartToggle = (id) => {
    if (cart.includes(id)) {
      setCart(cart.filter(itemId => itemId !== id))
    } else {
      setCart([...cart, id])
    }  
  }

  return (
    <>
      <h1>
       Product Search
      </h1> 
      <input type="text" value={search} onChange={(e)=> {setSearch(e.target.value)}}/>
      <div className="card">
        {data.map((item, index)=> (
          <div id={item.id} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid black'
          , marginBottom: '10px'}}>
            <img src={item.images[0]} height={300} width={300}/>
            <span>{item.title}</span><br/>
            <span>{item.description}</span>
            <button onClick={() => handleCartToggle(item.id)} style={{background: 'lightblue'}}>  {cart.includes(item.id) ? 'Remove' : 'Add Item'}</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App;
