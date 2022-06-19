import React from 'react'

function Top({setQuery}) {
  
    const cities =[
        {
          id: 1,
          title: 'London'
        },
        {
            id: 2,
            title: 'Delhi'
          },
          {
            id: 3,
            title: 'Mumbai'
          },
          {
            id: 4,
            title: 'Ruo'
          },
          {
            id: 5,
            title: 'Lucknow'
          },
    ]


  return (
    <div className='flex items-center justify-around my-6 ml-10 mr-10' >
        {cities.map((city)=>(
            <button key={city.id} className='text-white text-lg font-medium' onClick={()=>setQuery({q:city.title})} >{city.title}</button>
        ))}
    </div>
  )
}

export default Top