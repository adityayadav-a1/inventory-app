function makeSale() {

    const user = JSON.parse(localStorage.getItem("user")); // 🔥 ADD

    fetch(API +  `/sales/user/${user.id}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            productId: +saleProductId.value,
            quantity: +saleQty.value,
            userId: user.id   // 🔥 ADD THIS
        })
    })
    .then(async res => {
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || "Sale failed");
        }
        return res.json();
    })
    .then(() => {
        alert("Sale Done");
        loadStock();
    })
    .catch(err => {
        alert(err.message);
    });
}

let chart;
function updateChart(data) {

    const labels = data.map(p => p.name);
    const values = data.map(p => p.quantity);

    if (chart) chart.destroy();

    chart = new Chart(document.getElementById("stockChart"), {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Stock",
                data: values
            }]
        }
    });
}

function loadStock() {

    const user = JSON.parse(localStorage.getItem("user"));

    fetch(`/products/user/${user.id}`)
        .then(res => res.json())
        .then(data => {

            const table = document.getElementById("stockTable");
            table.innerHTML = "";

            data.forEach(p => {
                table.innerHTML += `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.name}</td>
                        <td>${p.supplierId}</td>
                        <td>${p.quantity}</td>
                    </tr>
                `;
            });

            updateChart(data); // 🔥 ADD THIS
        });
}

function selectProduct(id) {
    document.getElementById("saleProductId").value = id;
}

document.addEventListener("DOMContentLoaded", loadStock);

