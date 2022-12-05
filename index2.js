
const inputNombre = document.getElementById('nombre')
const inputApellido = document.getElementById('apellido')
const botonIngresarr = document.getElementById('ingresarr')
const divInicial = document.getElementById('divInicial')
const divSaludar = document.getElementById('divSaludar')
botonIngresarr.onclick = () => {
if (inputNombre.value || inputApellido.value) {
    const usuario = {
    nombre: inputNombre.value,
    apellido: inputApellido.value,
    }
    localStorage.setItem('infoUsuario', JSON.stringify(usuario))
    divInicial.remove()
    const saludarTitulo = document.createElement('h2')
    saludarTitulo.innerHTML += `Bienvenido ${usuario.nombre} ${usuario.apellido} a Yago Castro BarberShop <a href="../tienda.html" class="subir">Ir a la tienda</a>
    `

    divSaludar.append(saludarTitulo)

}}


