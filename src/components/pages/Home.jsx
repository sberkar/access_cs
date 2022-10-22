import { useState, useEffect } from 'react'
import APIList from '../partials/APIList';
import "../styles/home.css"

function Home() {
  const [dataList, setDataList] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://api.publicapis.org/entries?category=entertainment")
    .then(res => res.json())
    .then(data => {
      console.log(data.entries);
      setDataList(data.entries)
      setLoading(false)
    })
  }, [])
  return (
    <div className='page home'>
      <div className='api-container'>
      {loading?<div>Loading...</div>:dataList.map((api) => {
          return <APIList data={api}/>
        })} 
      </div>
    </div>
  )
}

export default Home