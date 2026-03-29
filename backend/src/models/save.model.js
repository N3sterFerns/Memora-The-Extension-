import mongoose from "mongoose";

const saveSchema = mongoose.Schema(
  {
    url: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcCBHgbS23kyBw2r8Pquu19UtKZnrZmFUx1g&s",
    },
    tags: [String],
    type: String,
    embedding: {
      type: [Number]
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true },
);

const saveModel = mongoose.model("save", saveSchema);

export { saveModel };
