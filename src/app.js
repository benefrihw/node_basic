import express from "express";
import connect from "./schemas/index.js";
import ProductsRouter from "./routers/products.router.js";

const app = express();
const PORT = 3000;

connect();

// Express에서 req.body에 접근하여 body 데이터를 사용할 수 있도록 설정하는 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ message: "Hello World!" });
});

// localhost:3000/api -> router, ProductsRouter
app.use("/api", [ProductsRouter]);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
