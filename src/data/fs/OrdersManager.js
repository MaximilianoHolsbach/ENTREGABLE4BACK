import fs from "fs"
import crypto from "crypto"

class OrdersManager {
    constructor(ruta){
        this.orders = []
        this.ruta = ruta
        this.init()
    }

    init(){
        const file = fs.existsSync(this.ruta)
        if(file ){
            this.orders = JSON.parse(fs.readFileSync(this.ruta,"utf-8"))
        }else{
            fs.writeFileSync(this.ruta, JSON.stringify(this.orders, null, 2))
        }
    }

    async create(data){
        try {
          const order = {
            oid : crypto.randomBytes(12).toString("hex"),
            pid : data.pid,
            uid : data.uid,
            quantity : data.quantity,
            state : data.state
          }
          this.orders.push(order)
          const ordersFile = JSON.stringify(this.orders,null, 2)
          await fs.promises.writeFile(this.ruta,ordersFile,"utf-8") 
        } catch (error) {
            return error.message 
        }
    }

    read(){
        try {
            if (this.orders.length == 0){
                throw new Error("No existen ordenes cargadas")
            }
            return this.orders
        } catch (error) {
            return error.message
        }
    }

    readOne(uid){
        try {
            const ordersUid = this.orders.filter((order) => order.uid == uid)
            if(ordersUid.length == 0){
                throw new Error("No existen ordenes cargadas para este usuario")
            }
            return ordersUid
        } catch (error) {
            return error.message
        }
    }

    async update(oid, quantity, state){
        try {
            const ordersUpdate = this.orders.find((order) => order.oid == oid)
            if(!ordersUpdate){
                throw new Error(`El código de orden ${oid}, no es valido`)
            }
            ordersUpdate.quantity = quantity
            ordersUpdate.state = state
            const index = this.orders.findIndex((order) => order.oid == oid)
            this.orders[index] = ordersUpdate
            const order = JSON.stringify(this.orders, null, 2)
            await fs.promises.writeFile(this.ruta, order, "utf-8")
        } catch (error) {
            return error.message
        }
    }

    destroy(oid){
        try {
            const orderOid = this.orders.findIndex((order) => order.oid == oid) 
            if(orderOid == -1){
                throw new Error(`El código de orden ${oid} no es valido`)
            }
            this.orders.splice(orderOid, 1)[0]
            const carrito = JSON.stringify(this.orders, null, 2)
            fs.promises.writeFile(this.ruta, carrito, "utf-8")
        } catch (error) {
            return error.message
        }
    }
}

const carrito = new OrdersManager("./src/data/fs/files/orderManager.json")

export default carrito

/*
carrito.create(
    {
        pid : 2,
        uid : 1,
        quantity : 3,
        state : "pendiente"
    }
)
carrito.create(
    {
        pid : 3,
        uid : 2,
        quantity : 1,
        state : "En proceso"
    }
)
carrito.create(
    {
        pid : 1,
        uid : 2,
        quantity : 3,
        state : "Entregada"
    }
)
*/
//console.log(carrito.read())

//console.log(carrito.readOne(2))

//carrito.update('29f156e9257889b52be31c67',10,"Entregada")

//console.log(carrito.readOne(2))

//carrito.destroy("48b582f0deb47d251fcd1a59")

//console.log(carrito.read())