import React from 'react'


function OwnerItemCard() {
    console.log("OwnerItemCard data:", data);
  console.log("Image URL:", data?.image);
  return (

    <div style={{backgroundColor: 'red', padding: '20px', margin: '10px'}}>
            <h3>TEST: OwnerItemCard is rendering!</h3>
            <p>Data: {JSON.stringify(data)}</p>



    <div className='flex bg-white rounded-lg shadow-md overflow-hidden border border-[#ff4d2d]
    w-full max-w-2xl'>
        <div className='w-36 h-full flex shrink-0 bg-gray-50'>
            <img src={data.image} alt="" className='h-full w-full object-cover'/>
        </div>
    </div>

    
    </div>
  )
}

export default OwnerItemCard