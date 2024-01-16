import fs from "fs";
import crypto from "crypto"
class ProductManager {
  constructor(ruta) {
    this.products = [];
    this.ruta = ruta;
    this.init(); // Metodo para inicializar la clase dependiendo de la existencia del archivo
  }
  init() {
    const file = fs.existsSync(this.ruta); // Con el modulo comprobamos la existencia del archivo
    if (file) {
      this.products = JSON.parse(fs.readFileSync(this.ruta, "utf-8")); // Asigno el contenido del archivo al array de objetos
    } else {
      fs.writeFileSync(this.ruta, JSON.stringify(this.products, null, 2)); // Creo un archivo con un array vacio
    }
  }
  async create(data) {
    try {
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };
      this.products.push(product); // Pusheamos al producto en el array
      const productsFile = JSON.stringify(this.products, null, 2); // Pasamos a texto plano el array actualizado
      await fs.promises.writeFile(this.ruta, productsFile, "utf-8"); // Actualizamos el contenido del archivo
    } catch (error) {
      return error.message;
    }
  }
  read() {
    try {
      if (this.products.length === 0) {
        throw new Error("No existen usuarios cargados");
      } else {
        return this.products;
      }
    } catch (error) {
      return error.message;
    }
  }
  readOne(id) {
    const productById = this.products.find((product) => product.id == id); // Utilizamos el metodo .find para iterar el array y comparar el valor de la clave id con la ingresada
    try {
      if (!productById) {
        throw new Error("El id ingresado no corresponde a ningún producto");
      } else {
        return productById;
      }
    } catch (error) {
      return error.message;
    }
  }
  async update(id, data){
    try {
      const product = this.readOne(id)
      if(product == "El id ingresado no corresponde a ningún producto"){
        throw new Error(`Ingrese un id ${id} valido`)
      }else{
        const productUpdate = Object.assign(product, data)
        const index = this.products.findIndex((product) => product.id == id)
        this.products[index] = productUpdate
        const productos = JSON.stringify(this.products,null,2)
        await fs.promises.writeFile(this.ruta,productos,"utf-8")
      }
    } catch (error) {
      return error.message;
    }
  }
  async destroy(id) {
    try {
      const index = this.products.findIndex(
        (product) => product.id == (id)
      );
      if (index === -1) {
        throw new Error(
          `El id ${id} ingresado no corresponde a ningún producto`
        );
      }
      this.products.splice(index, 1)[0];
      const carrito = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.ruta, carrito, "utf-8");
    } catch (error) {
      return error.message;
    }
  }
}

const producto = new ProductManager("./src/data/fs/files/productManager.json");

export default producto;
/*
producto.create({
  title: "TONER MP301",
  photo:
    "https://png.pngtree.com/png-vector/20190321/ourlarge/pngtree-vector-users-icon-png-image_856952.jpg",
  price: 10,
  stock: 50,
});
producto.create({
  title: "TONER MP402",
  photo:
    "https://png.pngtree.com/png-vector/20190321/ourlarge/pngtree-vector-users-icon-png-image_856952.jpg",
  price: 30,
  stock: 50,
});
producto.create({
  title: "TONER MP501",
  photo:
    "https://png.pngtree.com/png-vector/20190321/ourlarge/pngtree-vector-users-icon-png-image_856952.jpg",
  price: 50,
  stock: 50,
});
producto.create({
  title: "TONER MP305",
  photo:
    "https://png.pngtree.com/png-vector/20190321/ourlarge/pngtree-vector-users-icon-png-image_856952.jpg",
  price: 70,
  stock: 50,
});

//console.log(producto.read());

//console.log(producto.readOne(1));

//producto.destroy(3)

//console.log(producto.read());

producto.update(1,{
  title: "TONER MP301",
  photo:"https://png.pngtree.com/png-vector/20190321/ourlarge/pngtree-vector-users-icon-png-image_856952.jpg",
  price: 100,
  stock: 50,
})

console.log(producto.read())*/