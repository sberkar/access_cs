import React from 'react';
import { FaHashtag, FaRegBookmark, FaSecure } from "react-icons/fa";
import { MdOutlineHttps, MdHttps } from "react-icons/md"
import { Link } from 'react-router-dom';

function APIData({ apiData }) {
    return (
        <div className='api-data'>
            <div className="api-data-header">
                <h2 className="api-title">
                    {apiData[0].API}
                </h2>
                <div className="api-data-action">
                    <FaRegBookmark />
                </div>
            </div>
            <span>
                <FaHashtag className='hashtag' /><Link to={`/category/${apiData[0].Category}`} >{apiData[0].Category}</Link>
            </span>
            <p className='api-data-info'>
                {apiData[0].Description}
            </p>
            <p className='api-data-info'>
                {apiData[0].HTTPS ? <MdHttps /> : <MdOutlineHttps />} HTTPS : {apiData[0].HTTPS? "Yes": "No"}
            </p>
            <p className='api-data-info'>
                Auth: {apiData[0].Auth === ""? "Any": apiData[0].Auth}
            </p>
            <p className='api-data-info'>
                CORS: {apiData[0].Cors}
            </p>
            <div className='ga'>
                <a target="_blank" className='ga-cta' href={`${apiData[0].Link}`}>Get Access</a>
            </div>
        </div>
    )
}
export default APIData;