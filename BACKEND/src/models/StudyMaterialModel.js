import mongoose from "mongoose";

const { Schema } = mongoose;

const MaterialSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  visibility: {
    type: String,
    enum: ["public", "private"],
    default: "public",
  },
  reviews: [
    {
      rating: {
        type: Number,
        default: 0,
      },
      comment: {
        type: String,
      },
    },
  ],

  aiSummery: {
    type: String,
  },
});

const Material = mongoose.model("Material", MaterialSchema);
export default Material;
