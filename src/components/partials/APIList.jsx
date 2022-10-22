import React from 'react';
import { Link } from 'react-router-dom';

function APIList(props) {
    let data = props.data;
  return (
      <div className='api'>
            <span>{data.Link.length>38? `${data.Link.slice(0, 37)}...` :
            data.Link}</span>
            <h2><Link to={`/api/${data.API}`}>{data.API}</Link></h2>
            <p>{data.Description}</p>
            <div className='api-actions'>
              <div className="more-info-btn">
                <button><Link to={`/api/${data.API}`}>More Info</Link></button>
              </div>
            </div>
      </div>
  )
}

export default APIList;