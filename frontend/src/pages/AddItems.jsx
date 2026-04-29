import axios from "axios";
import { useState, useRef } from 'react';
import { FaUtensils } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { setMyShopData } from '../redux/ownerSlice';




function AddItems() {
    const Navigate = useNavigate()
    const {myShopData}= useSelector(state=>state.owner)
    const[name,setName]= useState("")
    const[price,setPrice]= useState("")
    const[frontendImage,setFrontendImage]= useState(null)
    const[backendImage,setBackendImage]= useState(null)
    const[category,setCategory]=useState("")
    const[foodtype,setFoodType]=useState("veg")
    const categories=["Snacks",
        "Main Course",
        "Desserts",
        "Pizza",
        "Burgers",
        "Sandwiches",
        "South Indian",
        "North Indian",
        "Chinese",
        "Fast Food",
        "Sweets",
        "Others"]
    const dispatch = useDispatch()


    const    fileInputRef = useRef(null)
    const handleImage=(e) => {
    console.log("handleImage called");
    const file = e.target.files[0]
    console.log("Selected file:", file);
    if(file) {
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
        console.log("Image states updated");
    } else {
        console.log("No file selected");
    }
}

    const handleSubmit = async (e) => {
        e.preventDefault()
            console.log("Current backendImage state:", backendImage);
    console.log("Current frontendImage state:", frontendImage);
     // Try getting file directly from input
    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];
    console.log("File from input ref:", file);


        const formData = new FormData()
        console.log("zero")
        try {
            formData.append("name",name)
            formData.append("category",category)
            formData.append("foodType",foodtype)
            formData.append("price",price)
            if(backendImage){
                formData.append("image",backendImage)
                console.log("image file sent",backendImage)
            }
            else{
                console.log("no image file sent")
            }
            console.log("first")
            const result = await axios.post(`${serverUrl}/api/item/add-item`,formData,{withCredentials:true})
            dispatch(setMyShopData(result?.data))
            console.log(result?.data)
            console.log("second")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='flex justify-center flex-col items-center p-6 bg-linear-to-br relative
    from-orange-50 to-white min-h-screen'>
        <div className='absolute top-[20px] left-[20px] z-10 mb-[10px]  '>
            <IoMdArrowBack size={30} className='text-[#ff4d2d] cursor-pointer' onClick={()=>Navigate("/")} />
        </div>
        <div className='max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100'>
            <div className='flex flex-col items-center mb-6'>
                <div className='bg-orange-100 p-4 rounded-full mb-4'>
                    <FaUtensils className='text-[#ff4d2d] w-16 h-16' />
                </div>
                <div className='text-3xl font-extrabold text-gray-900'>
                    Add Food
                </div>
            </div>
            <form className='space-y-5' onSubmit={handleSubmit}>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                    <input type="text" placeholder='Enter Food Name' className='w-full px-4 py-2 border 
                    rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                    onChange={(e)=>setName(e.target.value)}
                    value={name}
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Food Image</label>
                    <input type="file" name="image" accept='image/*' className='w-full px-4 py-2 border
                    rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' ref={fileInputRef}
                    onChange={handleImage} />
                    {frontendImage && <div className='mt-4'>
                        <img src={frontendImage} alt="" className='w-full h-48 object-cover rounded-lg border'/>
                    </div> }
                    
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Price</label>
                    <input type="number" placeholder='0' className='w-full px-4 py-2 border
                    rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                    onChange={(e)=>setPrice(e.target.value)}
                    value={price}
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Select Category</label>
                    <select className='w-full px-4 py-2 border
                    rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                    onChange={(e)=>setCategory(e.target.value)}
                    value={category}
                    >
                        <option value="">select Category</option>
                        {categories.map((cate,index)=>(
                            <option value={cate} key={index}>{cate}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Select FoodType</label>
                    <select className='w-full px-4 py-2 border
                    rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                    onChange={(e)=>setFoodType(e.target.value)}
                    value={foodtype}
                    >
                        <option value="veg">veg</option>
                        <option value="non veg">non-veg</option>
                    
                    </select>
                </div>


                <button className='w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold
                shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200 cursor-pointer'>
                    Save
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddItems