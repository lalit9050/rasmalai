import { v2 as cloudinary } from 'cloudinary'

const uploadOnCloudinary = async (fileObject) => {
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    try {
        // Handle buffer upload
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'auto' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(fileObject.buffer);
        });
        
        return result.secure_url

    } catch (error) {
        console.log(error);
        throw error
    }
}

export default uploadOnCloudinary