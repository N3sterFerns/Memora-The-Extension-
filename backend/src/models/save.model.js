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
    image: String,
    tags: [String],
    type: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true },
);

const saveModel = mongoose.model("save", saveSchema);

export { saveModel };
