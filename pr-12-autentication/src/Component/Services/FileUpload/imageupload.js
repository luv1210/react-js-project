import axios from "axios"


export const ImageUpload  =async(file)  =>{
    let UploadImage = new FormData()
    UploadImage.append('file',file)
UploadImage.append("upload_preset","products")
    UploadImage.append("cloud_name","dtgzvgs1t")
    console.log("Running")
    try {

        
        let res = await axios.post(`https://api.cloudinary.com/v1_1/dtgzvgs1t/image/upload`, UploadImage);
        return res.data.secure_url
    } catch (error) {
         console.log(error.message)
    }
    
}