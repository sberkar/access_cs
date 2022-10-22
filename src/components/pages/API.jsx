import {useState, useEffect} from 'react';
import { useParams, Link } from "react-router-dom";
import APIData from '../partials/APIData';
import More from "../partials/More"
import "../styles/API.css"

function API() {
    const { id } = useParams();
    const [apiData, setApiData] = useState(null)
    const [more, setMore] = useState(null)
    const [cat, setCat] = useState("")



    useEffect(() => {
        fetch(`https://api.publicapis.org/entries?title=${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.entries)
            setApiData(data.entries)
            setCat(data.entries[0].Category);
        }).catch(err => console.log(err))
    }, [id])

    useEffect(() => {
        if(cat !== ""){
            fetch(`https://api.publicapis.org/entries?category=${cat}`)
            .then(res => res.json())
            .then(data => {
            console.log(data.entries)
            setMore(data.entries.slice(0, 5))
            })
        }
    }, [cat])
    
  return (
    <section className='page api-page'>
        <div className="api-container-app">
            {apiData && <APIData apiData={apiData} />}
            <div className="more-like">
                <h2>More Like This</h2>
                {more && <More datas={more} />}
            </div>
        </div>
    </section>
  )
}

export default API;