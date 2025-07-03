import {Router} from "express";
import { productController } from "../controllers/product.controller.js"

const productRouter =Router();

productRouter.get("/product", productController.get);
productRouter.post("/product", productController.post);
productRouter.put("/product/:id", productController.put);

export default productRouter;
