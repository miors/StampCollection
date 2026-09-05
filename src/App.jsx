import { useState } from 'react'

function Stamp({stamps}){
  return(<>
  {stamps.map(stamp => 
  <ul key={stamp.title}>
    <li>{stamp.title}</li>
    <li><img src={stamp.image} alt="random picture" /></li>
    <li>Country: {stamp.country}</li>
    <li>Rating: {stamp.rating}</li>
  </ul>
  )}

</>);
}

function App() {
  const allStamps = [{title:"Penny Farthings",image:"https://picsum.photos/200",country:"UK",rating:`3/5`},
    {title:"Queens Head",image:"https://picsum.photos/200",country:"Australia",rating:`4/5`},
    {title:"Malayan Tiger",image:"https://picsum.photos/200",country:"Malaysia",rating:`5/5`},
    {title:"Sydney Harbour",image:"https://picsum.photos/200",country:"Australia",rating:`1/5`}
  ]
  const [stamps, setStamps] = useState(allStamps)

  function filterStamp(flag){
    if (flag === "all"){
      setStamps(allStamps)
    }else 
      setStamps(allStamps.filter(stamp => stamp.country === flag))
  }

  return (
    <>  <p>Total stamps:{allStamps.length}</p>
        <button onClick={()=> filterStamp("all")}>All ({allStamps.length})</button>
        <button onClick={()=> filterStamp("UK")}>Country:UK ({allStamps.filter(stamp => stamp.country === "UK").length})</button>
        <button onClick={()=> filterStamp("Malaysia")}>Country:Malaysia ({allStamps.filter(stamp => stamp.country === "Malaysia").length})</button>
        <button onClick={()=> filterStamp("Australia")}>Country:Australia ({allStamps.filter(stamp => stamp.country === "Australia").length})</button>
       <Stamp stamps={stamps} />
    </>
  )
}

export default App
