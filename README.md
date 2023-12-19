# PROYECTO ECOMMERCE DEL CURSO DE PROGRAMACIÓN BACKEND - CODERHOUSE

## Profesor titular - [Fredy Alexander Chaparro Castro]
## Tutor - [Enrique Cerioni]

<br>

## ENTREGA FINAL

### [Link al proyecto desplegado en Railway](https://back-end-e-commerce-production.up.railway.app/)


<br>

# ENDPOINTS

## Router "/"
## Registro
| Method  | Ruta        | Descripción          |
| :---    | :---        | :---                 |
| POST    | /signin     | Crear cuenta.        |
| GET     | /failSingin | Al fallar el signin. |  
<br>

## Inicio de sesión
| Method  | Ruta       | Descripción         |
| :---    | :---       | :---                |
| POST    | /login     | Loguear cuenta.     |
| GET     | /failLogin | Al fallar el login. |  
<br>

## Index
| Method | Ruta | Descripción      |
| :---   | :--- | :---             |
| GET    | /    | Acceder a index. |  
<br>

## Productos
| Method | Ruta                 | Descripción                         |
| :---   | :---                 | :---                                |
| GET    | /api/products        | Devuelve todos los productos.       |
| GET    | /api/products:filtro | Devuelve productos segun el filtro. |
<br>

## Carrito
| Method  | Ruta                         | Descripción                      |
| :---    | :---                         | :---                             |
| GET     | /api/carts                   | Devuelve el carrito.             |
| PUT/GET | /api/carts/addProduct/:id    | Añade un producto al carrito.    |
| PUT/GET | /api/carts/deleteProduct/:id | Elimina un producto del carrito. |
| GET     | /api/carts/checkout          | Realizar pedido de compra.       |
<br>

## Perfil
| Method | Ruta    | Descripción |
| :---   | :---    | :---        |
| GET    | /profile | Informacion del usuario. |
<br>

## Cierre de sesión
| Method | Ruta    | Descripción                |
| :---   | :---    | :---                       |
| GET    | /logout | Desloguear session activa. |
<br>

## Router "/productosApi"
| Method | Ruta | Descripción                              |
| :---   | :--- | :---                                     |
| POST   | /    | Crear uno o varios productos.            |
| GET    | /    | Recuperar todos los productos.           |
| GET    | /:id | Recuperar un producto.                   |
| PUT    | /:id | Actualizar un producto.                  |
| DELETE | /:id | Eliminar un producto o varios productos. |
| DELETE | /    | Eliminar todos los productos.            |

## Alumno
## Matias Cambareri