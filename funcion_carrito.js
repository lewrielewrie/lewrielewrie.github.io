var productosEnCarrito = localStorage.getItem('productosEnCarritoTemp')
var productosEnCarritoTemp = []

function cargarPaginaCarrito() {

    function borrarCarrito() {

        productosEnCarritoTemp = null
        localStorage.setItem("productosEnCarritoTemp", productosEnCarritoTemp);
        document.getElementById('noEncontrado').style.display = "block"
        document.getElementById('productos_contenedor').style.display = "none"

    }

    if (document.title == 'Lewrie - Carrito') {

        const button_borrar = document.getElementById("producto_borrar")
        button_borrar.addEventListener("click", borrarCarrito)

        let productosEnCarritoArray = []
        let producto = []
        let productoValor = ''
        let comas = 0
    
        if (productosEnCarrito != 'null') {

            productosEnCarrito = Array.from(productosEnCarrito)
            for (let i = 0; i < productosEnCarrito.length; i++) {
    
                if (productosEnCarrito[i] != ',') {
        
                    productoValor += productosEnCarrito[i]
        
                } else if ((productosEnCarrito[i] == ',') && (comas != 4)) {
        
                    producto.push(productoValor)
                    productoValor = ''
                    comas++
        
                }
                
                if (comas == 4) {
        
                    productosEnCarritoArray.push(producto)
                    producto = []
                    comas = 0
        
                }
        
            }
        
            producto.push(productoValor)
            productosEnCarritoArray.push(producto)
        
            console.log(productosEnCarritoArray.length)
        
            if (productosEnCarritoArray.length == 0) {
                document.getElementById("noEncontrado").style.display = 'block'
            }
        
            for (let i = 0; i < productosEnCarritoArray.length; i++) {
    
                const productos_contenedor = document.getElementById("productos_contenedor")
                let producto = document.createElement("div")
                producto.classList.add("producto")
                
                let imagen = document.createElement("img")
                imagen.classList.add("image_producto")
                imagen.src = "images/" + productosEnCarritoArray[i][2]
                producto.appendChild(imagen)
    
                let informacion = document.createElement("p")
                informacion.classList.add("producto_p")
                informacion.innerHTML = "Producto: " + productosEnCarritoArray[i][0] + "<br><br>Precio: $" + productosEnCarritoArray[i][1] + "<br><br>Cantidad: " + productosEnCarritoArray[i][3]
                producto.appendChild(informacion)
    
                productos_contenedor.appendChild(producto)
    
            }
        } else {

            document.getElementById('noEncontrado').style.display = "block"

        }
    
    }

}

window.addEventListener("load", cargarPaginaCarrito)

function anadirAlCarrito(nombre_producto, precio, nombre_imagen) {

    let esNuevo = true

    for (let i = 0; i < productosEnCarritoTemp.length; i++) {
        if (productosEnCarritoTemp[i][0] == nombre_producto) {
            productosEnCarritoTemp[i][3]++
            esNuevo = false
            break
        }
    }

    if (esNuevo == true) {

        let productoNuevo = [nombre_producto, precio, nombre_imagen, 1]
        productosEnCarritoTemp.push(productoNuevo)

    }

    localStorage.setItem("productosEnCarritoTemp", productosEnCarritoTemp);

}