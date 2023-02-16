import React, { ReactComponentElement, useState } from 'react'
import './App.css'
import.meta.env
import { Nav } from './components/nav';
import { IDisruptionData } from './interfaces';


function App() {

  const [data, setData] = useState<IDisruptionData | null>(null); // union type

  const handleClick = (toc: string) => {
    fetch(`http://localhost:4000/api/national-rail/disruptions/${toc}`)
    .then(res => res.json())
    .then(response => setData(response))
  }

  const disrupt = data && data.map((disruption: any) => {
   return disruption;
  })

  //console.log(data && data)

  return (
    <div className="App">
      <h3>Disruptions</h3>
      <header>
        <p>Please Choose a Train Operating Company to see disruptions</p>
        <div>
            <p>Raw JSON Data</p>
            <Nav handleClick={handleClick} />
        </div>
      </header>
      <main>
        <p>{disrupt && disrupt != null && disrupt.CreationTime}</p>
      </main>
    </div>
  )
}

export default App
