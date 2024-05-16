import mongoose from "mongoose";

const Productsschema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  manager: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  createdAt: {
    // type: String,
  },
  updatedAt: {
    // type: String,
  },
});

// Productsschema 바탕으로 products모델을 생성하여, 외부로 내보냅니다.
export default mongoose.model("Products", Productsschema);
