let editingId = null;
let chart;

// 🔥 LOAD ALL
function loadProducts() {
    fetch("/products")
        .then(res => res.json())
        .then(data => {
            renderTable(data);
            renderChart(data);
        });
}

// 🔥 TABLE
function renderTable(data) {
    const table = document.getElementById("productTable");
    table.innerHTML = "";

    data.forEach(p => {
        table.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>₹ ${p.price}</td>
                <td>${p.supplierId}</td>
                <td>${p.quantity}</td>
                <td>
                    <button onclick="editProduct(${p.id}, '${p.name}', ${p.price}, ${p.quantity}, ${p.supplierId})">Edit</button>
                    <button onclick="deleteProduct(${p.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// 🔥 SAVE (ADD / UPDATE)
function saveProduct() {

    const product = {
        name: document.getElementById("name").value,
        price: document.getElementById("price").value,
        quantity: document.getElementById("quantity").value,
        supplierId: document.getElementById("supplierId").value
    };

    let url = "/products";
    let method = "POST";

    if (editingId) {
        url += "/" + editingId;
        method = "PUT";
    }

    fetch(url, {
        method: method,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(product)
    })
    .then(res => {
        if (!res.ok) return res.text().then(t => { throw new Error(t) });
        return res.json();
    })
    .then(() => {
        clearForm();
        loadProducts();
    })
    .catch(err => alert(err.message));
}

// 🔥 EDIT
function editProduct(id, name, price, qty, supplier) {
    editingId = id;

    document.getElementById("name").value = name;
    document.getElementById("price").value = price;
    document.getElementById("quantity").value = qty;
    document.getElementById("supplierId").value = supplier;
}

// 🔥 DELETE
function deleteProduct(id) {
    fetch("/products/" + id, { method: "DELETE" })
        .then(() => loadProducts());
}

// 🔥 CLEAR
function clearForm() {
    editingId = null;
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("supplierId").value = "";
}

// 🔥 CHART
function renderChart(data) {

    const labels = data.map(p => p.name + " (S" + p.supplierId + ")");
    const values = data.map(p => p.quantity);

    if (chart) chart.destroy();

    chart = new Chart(document.getElementById("productChart"), {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Stock Quantity",
                data: values,
                backgroundColor: values.map(v => v < 5 ? "red" : "green")
            }]
        }
    });
}

// INIT
window.onload = loadProducts;