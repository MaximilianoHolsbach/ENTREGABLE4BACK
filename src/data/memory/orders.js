class OrdersManager{
    static #orders = []
    constructor(data){
        this.id = OrdersManager.#orders.length == 0 ? 1 : OrdersManager.#orders[OrdersManager.#orders.length - 1].id + 1
        this.pid = data.pid;
        this.uid = data.uid;
        this.quantity = data.quantity;
        this.state = data.state
    }

    create(data){
        const order = {
            id  : OrdersManager.#orders.length == 0 ? 1 : OrdersManager.#orders[OrdersManager.#orders.length - 1].id + 1,
            pid : data.pid,
            uid : data.uid,
            quantity : data.quantity,
            state : data.state
        }
        return OrdersManager.#orders.push(order)
    }

    read(){
        console.log(OrdersManager.#orders);
    }

    readOne(uid){
        return OrdersManager.#orders.filter((order) => order.uid == uid) // Utilizamos el metodo filter para crear un array con todas las ordenes donde coincida el nombre del usuario. 
    }

    update(id, quantity, state){
        const orderUpdate = OrdersManager.#orders.find((order) => order.id == id)
        orderUpdate.quantity = quantity
        orderUpdate.state = state
        const index = OrdersManager.#orders.findIndex((order) => order.id == id)
        OrdersManager.#orders[index] = orderUpdate
        return OrdersManager.#orders
    }

    destroy(id){
        const index = OrdersManager.#orders.findIndex((order) => order.id == id)
        return OrdersManager.#orders.splice(index,1)[0]
    }
}

const orders = new OrdersManager({})

orders.create(
    {
        pid : 2,
        uid : 1,
        quantity : 3,
        state : "pendiente"
    }
)
orders.create(
    {
        pid : 3,
        uid : 2,
        quantity : 1,
        state : "En proceso"
    }
)
orders.create(
    {
        pid : 1,
        uid : 2,
        quantity : 3,
        state : "Entregada"
    }
)

orders.read()

//console.log(orders.readOne(2))

orders.update(2,10,"Entregada")

//console.log(orders.readOne(2))

//orders.destroy(1)

orders.read()
