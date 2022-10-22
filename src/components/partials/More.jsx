import React from 'react'

function More({datas}) {
  return (
    <div className='more'>
        {datas.map(data => {
          return <div>
            {data.API}
          </div>
        })}
    </div>
  )
}

export default More;