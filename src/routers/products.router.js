import express from "express";
import mongoose from "mongoose";
import Products from "../schemas/product.schema.js";

const router = express.Router();

const products = [
  {
  },
];

/** 상품 목록 조회 API **/
// localhost:3000/api/products
router.get("/products", async (req, res) => {
  const products = await Products.find()
    .select("-password")
    .sort({ createdAt: -1 })
    .exec();
  return res.status(200).json({
    status: 200,
    message: "상품 목록 조회에 성공했습니다.",
    data: products,
  });
});

/** 상품 상세 조회 API **/
// localhost:3000/api/products/:id
router.get("/products/:id", async (req, res) => {
  // 1. 상품 id 조회
  const { id } = req.params;

  // 2. 상품 id와 일치하는 데이터 찾기
  const products = await Products.findOne({ _id: id })
    .select("-password")
    .exec();

  // 2-1. 일치하는 상품이 없으면 error를 반환한다.
    if (!products) {
      return res
        .status(404)
        .json({ errorMessage: "해당 상품이 존재하지 않습니다." });
    }

  // 3. 조회된 상품 정보를 Return한다.
  return res.status(200).json({
    status: 200,
    message: "상품 상세 조회에 성공했습니다.",
    data: products,
  });
});

/** 상품 생성 API **/
// localhost:3000/api/products
router.post("/products", async (req, res) => {
  // 1. 입력 데이터 확인
  const { id, name, description, manager, password } = req.body;

  // 2. 데이터를 바탕으로 상품을 등록한다.
  const products = new Products({
    id,
    name,
    description,
    manager,
    password,
    status: "FOR_SALE",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // 3. 등록된 상품을 기존의 목록에 붙인다.
  const newProducts = await products.save();
  const addProducts = newProducts.toObject();
  delete addProducts.password;

  // 4. 등록된 상품을 클라이언트에게 반환한다.
  return res.status(201).json({
    status: 201,
    message: "상품 생성에 성공했습니다.",
    data: newProducts,
  });
});

/** 상품 수정 API **/
// localhost:3000/api/products/:id
router.patch("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, manager, status, password } = req.body;

  // 1. 해당 id로 상품이 존재하는지 확인한다.
  const products = await Products.findById(id).exec();

  if (!products) {
    return res
      .status(404)
      .json({ errorMessage: "해당 상품이 존재하지 않습니다." });
  }

  // 2. 비밀번호가 일치하지 않으면 error를 반환한다.
  if (products.password !== password) {
    return res
      .status(401)
      .json({ errorMessage: "비밀번호가 일치하지 않습니다." });
  }

  // 3. 상품 정보를 변경한다.
  if (name || description || manager || status) {
    products.name = name;
    products.description = description;
    products.manager = manager;
    products.status = status;    
  }

  products.updatedAt = new Date();
  const updatedProducts = await products.save();

  // 4. 수정된 상품 데이터를 클라이언트에게 반환한다.
  return res.status(200).json({
    status: 200,
    message: "상품 수정에 성공했습니다.",
    data: updatedProducts,
  });
});

/** 상품 삭제 API **/
// localhost:3000/api/products/:id
router.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  // 1. 해당 id로 상품이 존재하는지 확인한다.
  const products = await Products.findById(id).exec();

  if (!products) {
    return res
      .status(404)
      .json({ errorMessage: "해당 상품이 존재하지 않습니다." });
  }

  // 2. 비밀번호가 일치하지 않으면 error를 반환한다.
  if (products.password !== password) {
    return res
      .status(401)
      .json({ errorMessage: "비밀번호가 일치하지 않습니다." });
  }

  // 3. 상품을 삭제한다.
  await Products.deleteOne({ _id: id }).exec();

  // 4. 삭제한 상품 데이터를 클라이언트에게 반환한다.
  return res.status(200).json({
    status: 200,
    message: "상품 삭제에 성공했습니다.",
    data: id,
  });
});

export default router;
