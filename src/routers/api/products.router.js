import { Router } from "express";
import producto from "../../data/fs/ProductFsManager.js";
import propsProducts from "../../middleware/propsProducts.js";

const productsRouter = Router();

// Definir post get put delete

productsRouter.post("/", propsProducts, async (req, res, next) => {
  try {
    const data = req.body; // Extraemos la información del body
    const response = await producto.create(data);
      return res.json({
        statusCode: 201,
        response
      });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const response = await producto.read();
    if (Array.isArray(response)) {
      return res.json({
        statusCode: 200,
        response,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: response,
      });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = producto.readOne(pid);
    if (product == "El id ingresado no corresponde a ningún producto") {
      return res.json({
        statusCode: 400,
        message: product,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: product,
      });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.put("/:pid/:quantity", async (req, res, next) => {
  try {
    const { pid, quantity } = req.params;
    const product = await producto.sold(pid, quantity);
    if (
      product == `Ingrese un id ${pid} valido` ||
      product == `Ingrese una cantidad ${quantity} valida`
    ) {
      return res.json({
        statusCode: 400,
        message: product,
      });
    } else {
      return res.json({
        statusCode: 200,
      });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await producto.destroy(pid);
    if (product == `El id ${pid} ingresado no corresponde a ningún producto`) {
      return res.json({
        statusCode: 400,
        message: product,
      });
    } else {
      return res.json({
        statusCode: 200,
        message: `Se elimino el producto con el id ${pid}`,
      });
    }
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
