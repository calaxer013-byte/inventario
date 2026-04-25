const API = "http://localhost:3000/api/productos";

// Cargar productos
async function cargarProductos() {
    const res = await fetch(API);
    const data = await res.json();

    const tabla = document.getElementById("tablaProductos");
    tabla.innerHTML = "";

    data.forEach(p => {
        tabla.innerHTML += `
        <tr>
            <td>${p.id}</td>
            <td>${p.nombre}</td>
            <td>${p.precio}</td>
            <td>${p.stock}</td>
            <td>
                <button onclick="eliminar(${p.id})">Eliminar</button>
            </td>
        </tr>
        `;
    });
}

// Agregar producto
document.getElementById("formProducto").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const stock = document.getElementById("stock").value;

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, precio, stock })
    });

    cargarProductos();
});

// Eliminar
async function eliminar(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    cargarProductos();
}

// Inicial
cargarProductos();