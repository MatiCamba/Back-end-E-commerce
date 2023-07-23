const socketClient = io();

socketClient.on("sendProducts", (obj) => {
    //console.log(products);
    updateproduct(obj);
});

// Agregar productos
let form = document.getElementById("formProduct");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let price = document.getElementById("price").value;
    let code = document.getElementById("code").value;
    let category = document.getElementById("category").value;
    let stock = document.getElementById("stock").value;
    let thumbnail = document.getElementById("thumbnail").value;

    socketClient.emit("addProduct", {
        title,
        description,
        price,
        code,
        category,
        stock,
        thumbnail
    });

    form.reset();
})

function updateproduct(productsList) {
    let container = document.getElementById("list-products");
    container.innerHTML = ""; // Limpiar el contenedor antes de agregar los productos

    // Crear la tabla
    const table = document.createElement("table");
    table.classList.add("product-table");

    // Crear la fila de encabezado
    const headerRow = document.createElement("tr");
    const headers = ["ID", "img", "Nombre del producto", "Precio", "Codigo", "Categoria", "Stock"];
    headers.forEach((headerText) => {
        const headerCell = document.createElement("th");
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });
    table.appendChild(headerRow);
    console.log(productsList);

    // Crear una fila por cada producto
    productsList.forEach((product) => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = product.pid;
        row.appendChild(idCell);

        const thumbnailCell = document.createElement("td");
        const thumbnailImage = document.createElement("img");
        thumbnailImage.src = product.thumbnail;
        thumbnailImage.alt = product.title;
        thumbnailCell.appendChild(thumbnailImage);
        row.appendChild(thumbnailCell);

        const titleCell = document.createElement("td");
        titleCell.textContent = product.title;
        row.appendChild(titleCell);

        const priceCell = document.createElement("td");
        priceCell.textContent = product.price;
        row.appendChild(priceCell);

        const codeCell = document.createElement("td");
        codeCell.textContent = product.code;
        row.appendChild(codeCell);

        const categoryCell = document.createElement("td");
        categoryCell.textContent = product.category;
        row.appendChild(categoryCell);

        const stockCell = document.createElement("td");
        stockCell.textContent = product.stock;
        row.appendChild(stockCell);

        table.appendChild(row);
    });

    // Agregar la tabla al contenedor
    container.appendChild(table);
}  

// elimina productos del catalogo por id
document.getElementById("delete-btn").addEventListener("click", (e) => {
    
    let pid = document.getElementById("id-prod").value;
    socketClient.emit("deleteProduct", pid);
    document.getElementById("id-prod").value = "";
});