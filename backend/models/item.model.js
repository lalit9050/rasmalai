import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shop",
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Snacks",
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
        "Others",
      ],
      required:true
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    foodType:{
        type:String,
        enum:["veg","Non-veg"],
        required:true
    }
  },
  { timestamps: true },
)
const Item = mongoose.model("Item",itemSchema)
export default Item