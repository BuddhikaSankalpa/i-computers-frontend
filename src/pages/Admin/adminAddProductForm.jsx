import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uploadMedia from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import api from "../../utils/api";

export default function AdminAddProductForm(){

    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [labelledPrice, setLabelledPrice] = useState("");
    const [images, setImages] = useState([]);
    const [isAvailable, setIsAvailable] = useState(true);
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [isLoading, setIsLoading] = useState(false);//loading state for save button
    const navigate = useNavigate();


    async function addProduct(){

        setIsLoading(true);
//-----------------------------------------------------------------------------------------------------------------------------------
        //get token from local storage
        const token = localStorage.getItem("token");

        if(token == null){
            toast.error("You must be logged in to add a product");
            navigate("/signin");
            return;
        }


//-----------------------------------------------------------------------------------------------------------------------------------

        //images upload ["url1", "url2", "url3"]
        //"headphone,headset,audio device"
        //altNames -> ["headphone", "headset", "audio device"]

        //json of a product send backend

        //images upload promises
        const imageUploadPromises = []

        for(let i=0; i<images.length; i++){

            imageUploadPromises.push(uploadMedia(images[i]))

        }
        //imageUploadPromises -> [Promise1, Promise2, Promise3]
    try{

        const imageUrls = await Promise.all(imageUploadPromises);//imageUrls -> ["url1", "url2", "url3"] image Url arrays

//------------------------------------------------------------------------------------------------------------------------------------

        const altNamesArray = altNames.split(",")//split altnames string to array ["headphone", "headset", "audio device"]

//------------------------------------------------------------------------------------------------------------------------------------

        //request body to send backend
        const requestBody = {
            productId : productId,
            name : name,
            altNames : altNamesArray,
            description : description,
            price : price,
            labelledPrice : labelledPrice,
            images : imageUrls,
            isAvailable : isAvailable,
            category : category,
            stock : stock,
            brand : brand,
            model : model
        }

        //backend post request to add product
        //app.use("/api/products", productRoutes) in backend
        //productRouter.post("/" , createProduct) in backend

        await api.post("/products", requestBody , //request body එක (requestBody)
            {
                headers : {
                    Authorization : "Bearer " + token
                }
            } 
        )

        toast.success("Product added successfully");
        navigate("/admin/products");
        
        //set loading false after request is done
        setIsLoading(false);

    }catch(error){
        toast.error(error?.response?.data?.message || "Failed to add product");
        setIsLoading(false);
    }

    }

//------------------------------------------------------------------------------------------------------------------------------------

  //for common input and label classNames  
  const inputClassName = "w-full h-[40px] bg-white/10 border border-white/20 rounded-lg px-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#00f2fe] focus:ring-1 focus:ring-[#00f2fe] transition-all backdrop-blur-sm";
  const labelClassName = "font-semibold text-white/90 mb-1 text-sm tracking-wide";

  
    return (
    <div className="w-full h-full flex flex-col items-center">
      
      {/* Header Section */}
      <div className="w-full h-[90px] backdrop-blur-md bg-white/5 border border-white/10 shadow-lg rounded-xl flex px-6 items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-purple-400">Add New Product</h1>
        <div className="h-full gap-4 flex items-center">
          <Link
            to="/admin/products"
            className="bg-white/10 hover:bg-white/20 text-white w-[100px] text-center py-2.5 rounded-lg border border-white/20 transition-all font-medium"
          >
            Cancel
          </Link>
          <button
            disabled={isLoading}
            className="bg-gradient-to-r from-[#00f2fe] to-blue-600 hover:from-blue-500 hover:to-purple-500 text-white w-[120px] py-2.5 rounded-lg font-bold shadow-[0_0_15px_rgba(0,242,254,0.4)] hover:shadow-[0_0_20px_rgba(0,242,254,0.6)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={addProduct}
          >
            {isLoading ? "Saving..." : "Save Product"}
          </button>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full flex flex-wrap gap-y-6 backdrop-blur-sm bg-black/20 p-6 rounded-xl border border-white/5 shadow-2xl">
        
        <div className="w-full md:w-[32%] flex flex-col px-2">
          <label className={labelClassName}>Product ID</label>
          <input value={productId} onChange={(e) => setProductId(e.target.value)} className={inputClassName} placeholder="e.g. PD-001" />
        </div>

        <div className="w-full md:w-[32%] flex flex-col px-2">
          <label className={labelClassName}>Product Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputClassName} placeholder="e.g. Nvidia RTX 5090" />
        </div>

        <div className="w-full md:w-[34%] flex flex-col px-2">
          <label className={labelClassName}>Alternative Names <span className="italic text-xs text-gray-400 font-normal">(comma-separated)</span></label>
          <input value={altNames} onChange={(e) => setAltNames(e.target.value)} className={inputClassName} placeholder="VGA, Graphic Card, GPU" />
        </div>

        <div className="w-full md:w-[24%] flex flex-col px-2">
          <label className={labelClassName}>Price (Rs.)</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClassName} style={{"colorScheme": "dark"}} placeholder="0.00" />
        </div>

        <div className="w-full md:w-[24%] flex flex-col px-2">
          <label className={labelClassName}>Labelled Price (Rs.)</label>
          <input type="number" value={labelledPrice} onChange={(e) => setLabelledPrice(e.target.value)} className={inputClassName} style={{"colorScheme": "dark"}} placeholder="0.00" />
        </div>

        <div className="w-full flex flex-col px-2">
          <label className={labelClassName}>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={`${inputClassName} h-[120px] py-2 resize-none`} placeholder="Enter detailed product description..." />
        </div>

        <div className="w-full md:w-[24%] flex flex-col px-2">
          <label className={labelClassName}>Product Images</label>
          <input multiple={true} onChange={(e) => { setImages(e.target.files) }} type="file" className={`${inputClassName} py-1.5 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#00f2fe]/20 file:text-[#00f2fe] hover:file:bg-[#00f2fe]/30 cursor-pointer`} />
        </div>
        {/* <div className="w-1/4 h-[70px] flex flex-col px-2">
            <label className="font-semibold">Availability</label>
            <input type="checkbox" checked={isAvailable} onChange={(e)=>setIsAvailable(e.target.checked)} className="w-full h-[40px] border rounded-lg px-2" />
        </div> */}

        <div className="w-full md:w-[24%] flex flex-col px-2">
          <label className={labelClassName}>Availability</label>
          <select value={isAvailable} onChange={(e) => { setIsAvailable(e.target.value === 'true') }} 
            className={`${inputClassName} text-white/80 [&>option]:bg-gray-900 [&>option]:text-white outline-none cursor-pointer`}>
            <option value={true}>Available</option>
            <option value={false}>Unavailable</option>
          </select>
        </div>

        <div className="w-full md:w-[24%] flex flex-col px-2">
          <label className={labelClassName}>Stock Quantity</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className={inputClassName} style={{"colorScheme": "dark"}} placeholder="0" />
        </div>

        <div className="w-full md:w-[24%] flex flex-col px-2">
          <label className={labelClassName}>Category</label>
          <select value={category} onChange={(e) => { setCategory(e.target.value) }} 
            className={`${inputClassName} text-white/80 [&>option]:bg-gray-900 [&>option]:text-white outline-none cursor-pointer `}>
            <option value="">Select Category</option>
            <option value="graphic card">Graphics Card</option>
            <option value="motherboard">Motherboard</option>
            <option value="cpu">CPU</option>
            <option value="ram">RAM</option>
            <option value="storage">Storage</option>
            <option value="power supply">Power Supply</option>
            <option value="case">Case</option>
            <option value="cooling">Cooling</option>
            <option value="peripherals">Peripherals</option>
            {/* keybords mouse laptops others */}
            <option value="keyboards">Keyboards</option>
            <option value="mouse">Mouse</option>
            <option value="laptops">Laptops</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div className="w-full md:w-[24%] flex flex-col px-2">
          <label className={labelClassName}>Brand <span className="italic text-xs text-gray-400 font-normal">(optional)</span></label>
          <select value={brand} onChange={(e) => { setBrand(e.target.value) }} 
            className={`${inputClassName} rounded-2xl text-white/80 [&>option]:bg-gray-900 [&>option]:text-white outline-none cursor-pointer`}>
            <option value="">Select Brand</option>
            <option value="nvidia">NVIDIA</option>
            <option value="amd">AMD</option>
            <option value="intel">Intel</option>    
            <option value="asus">ASUS</option>
            <option value="msi">MSI</option>
            <option value="gigabyte">Gigabyte</option>
            <option value="corsair">Corsair</option>
            <option value="cooler master">Cooler Master</option>
            <option value="logitech">Logitech</option>
            <option value="razer">Razer</option>
            <option value="dell">Dell</option>
            <option value="hp">HP</option>
            <option value="lenovo">Lenovo</option>
            <option value="apple">Apple</option>
            <option value="red dragon">Red Dragon</option>
          </select>
        </div>

        <div className="w-full md:w-[24%] flex flex-col px-2">
          <label className={labelClassName}>Model <span className="italic text-xs text-gray-400 font-normal">(optional)</span></label>
          <input value={model} onChange={(e) => setModel(e.target.value)} className={inputClassName} placeholder="e.g. RTX 5090" />
        </div>

      </div>
    </div>
  );

}