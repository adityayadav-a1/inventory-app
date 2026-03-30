function loadProducts() {
    fetch(API + "/products")
        .then(res => res.json())
        .then(data => {
            let table = document.getElementById("productTable");
            table.innerHTML = "";

            let labels = [];
            let values = [];

            data.forEach(p => {
                table.innerHTML += `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.name}</td>
                        <td>${p.supplierId}</td>
                        <td>₹${p.price}</td>
                        <td>${p.quantity}</td>
                        <td>
                            <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})">Delete</button>
                        </td>
                    </tr>
                `;

                labels.push(p.name);
                values.push(p.quantity);
            });

            drawChart(labels, values);
        });
}

function addProduct() {
    const product = {
        name: document.getElementById("name").value,
        price: +document.getElementById("price").value,
        quantity: +document.getElementById("quantity").value,
        supplierId: +document.getElementById("supplierId").value
    };

    fetch(API + "/products", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(product)
    })
    .then(async res => {
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || "Failed to add product");
        }
        return res.json();
    })
    .then(() => {
        alert("Product Added");
        loadProducts();

        // clear inputs
        document.getElementById("name").value = "";
        document.getElementById("price").value = "";
        document.getElementById("quantity").value = "";
        document.getElementById("supplierId").value = "";
    })
    .catch(err => {
        alert(err.message);
    });
}

function deleteProduct(id) {
    fetch(API + "/products/" + id, { method: "DELETE" })
        .then(() => loadProducts());
}

function loadLowStock() {
    fetch(API + "/products/low-stock")
        .then(res => res.json())
        .then(data => {
            let list = document.getElementById("lowStockList");
            list.innerHTML = "";

            data.forEach(p => {
                list.innerHTML += `<li>${p.name} - Qty: ${p.quantity}</li>`;
            });
        });
}