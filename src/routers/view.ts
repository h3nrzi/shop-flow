import express, { Request, Response } from "express";
import Product from "../models/product";

const viewRouter = express.Router();

viewRouter.get("/", async (req: Request, res: Response) => {
  const products = await Product.find();

  res.status(200).render("home", {
    title: "Shop Flow",
    products,
  });
});

viewRouter.get("/product-edit/:id", async (req: Request, res: Response) => {
   const product = await Product.findById(req.params.id)

  res.status(200).render("editProduct", {
    title: "Shop Flow",
    product
  });
});

viewRouter.get("/product-create", async (req: Request, res: Response) => {
  res.status(200).render("createProduct", {
    title: "Shop Flow",
  });
});


export default viewRouter;
