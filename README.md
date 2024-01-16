# ENTREGABLE4BACK

# Primera Entrega del Proyecto Final

## Consigna

Desarrollar un servidor de Express que funcione en el puerto 8080 e incorpore todos los middlewares necesarios para que la aplicación funcione correctamente: json, urlencoded, static, morgan, handlers (error y path). Enrutar correctamente los managers de fs de productos, usuarios y órdenes. 


### Métodos de los Managers

Cada manager (products, users) de memoria y de fs debe contar con los métodos:

- `create(data)`: Agrega un producto/usuario (id con crypto).
- `read()`: Devuelve el arreglo con todos los productos/usuarios.
- `readOne(id)`: Devuelve el objeto producto/usuario.
- `destroy(id)`: Elimina el objeto producto/usuario de la lista.

Además, agregar a cada manager (products, users) de memoria y de fs:

- `update(id)`: Actualiza el objeto producto/usuario de la lista.

Nota: Manejar todas las respuestas de éxito o fracaso solo con las propiedades `statusCode` (para el código) y `response` (para responder con datos o strings de errores).

### Manager de Órdenes

Las órdenes tienen las propiedades:

- `id` (propio del objeto)
- `pid` (id del producto)
- `uid` (id del usuario)
- `quantity` (cantidad ordenada)
- `state` (estado de la compra)

Clase `OrdersManager` (de memoria y fs):

- `create(data)`: Crea la orden del usuario (uid) para reservar (state) la cantidad (quantity) del producto (pid).
- `read()`: Devuelve el arreglo con todas las órdenes.
- `readOne(uid)`: Devuelve todas las órdenes que tiene el usuario (uid) en el carrito (readByUser).
- `update(oid, quantity, state)`: Modifica la cantidad o el estado de la orden oid del carrito.
- `destroy(oid)`: Quita la orden oid del carrito del usuario.

### Endpoints

#### Endpoints de Productos

- `POST /api/products`: Implementa el método `create(data)` de fs.
- `GET /api/products`: Implementa el método `read()` de fs.
- `GET /api/products/:pid`: Implementa el método `readOne(id)` de fs.
- `PUT /api/products/:pid`: Implementa el método `update(id)` de fs.
- `DELETE /api/products/:pid`: Implementa el método `destroy(id)` de fs.

#### Endpoints de Usuarios

- `POST /api/users`: Implementa el método `create()` de fs.
- `GET /api/users`: Implementa el método `read()` de fs.
- `GET /api/users/:uid`: Implementa el método `readOne(id)` de fs.

#### Endpoints de Órdenes

- `POST /api/orders`: Implementa el método `create(data)` de fs.
- `GET /api/orders/:uid`: Implementa el método `readOne(id)` de fs.
- `DELETE /api/orders/:oid`: Implementa el método `destroy(id)` de fs.

## Formato del Entregable

- Pull Request (PR) de rama `challenge1` hacia `main/master` según corresponda.
- Probar los endpoints y realizar algunas capturas de pantalla para incluir en la PR.
- Incluir `readme.md` explicando lo que se entregó.
- La entrega es individual; en caso de trabajar en parejas, informar al tutor con quién trabajaron (ambos deben avisar).