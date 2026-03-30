let chart;

// 🔥 LOAD DEFAULT (DATE-WISE)
function loadSales() {
    fetch("/sales")
        .then(res => res.json())
        .then(data => {

            console.log("API DATA:", data);

            let grouped = {};

            data.forEach(s => {
                if (!s.saleDate) return;

                let date = s.saleDate.split("T")[0];

                if (!grouped[date]) grouped[date] = 0;

                grouped[date] += s.quantity;
            });

            renderTableDate(grouped);
            renderChart(
                Object.keys(grouped),
                Object.values(grouped),
                "Sales Per Day"
            );
        })
        .catch(err => console.error(err));
}


// 🔥 TABLE (DATE VIEW)
function renderTableDate(grouped) {

    const head = document.getElementById("tableHead");
    const table = document.getElementById("salesTable");

    head.innerHTML = `
        <tr>
            <th>Date</th>
            <th>Total Quantity</th>
        </tr>
    `;

    table.innerHTML = "";

    if (Object.keys(grouped).length === 0) {
        table.innerHTML = "<tr><td colspan='2'>No data</td></tr>";
        return;
    }

    Object.keys(grouped).forEach(date => {
        table.innerHTML += `
            <tr>
                <td>${date}</td>
                <td>${grouped[date]}</td>
            </tr>
        `;
    });
}


// 🔍 SEARCH BY DATE
function searchByDate() {

    const input = document.getElementById("searchDate").value;

    if (!input) {
        alert("Select a date");
        return;
    }

    Promise.all([
        fetch("/sales").then(res => res.json()),
        fetch("/products").then(res => res.json())
    ])
    .then(([salesData, productData]) => {

        // 🔥 Map productId → productName
        let productMap = {};
        productData.forEach(p => {
            productMap[p.id] = p.name;
        });

        // 🔥 Filter sales by date
        let filtered = salesData.filter(s =>
            s.saleDate && s.saleDate.startsWith(input)
        );

        // 🔥 Group by PRODUCT ID (but store name also)
        let grouped = {};

        filtered.forEach(s => {

            if (!grouped[s.productId]) {
                grouped[s.productId] = {
                    name: productMap[s.productId] || "Unknown",
                    qty: 0
                };
            }

            grouped[s.productId].qty += s.quantity;
        });

        renderTableProductFull(grouped);

        renderChart(
            Object.values(grouped).map(g => g.name),
            Object.values(grouped).map(g => g.qty),
            "Product Sales"
        );
    });
}


// 🔥 TABLE (PRODUCT VIEW)
function renderTableProduct(grouped) {

    const head = document.getElementById("tableHead");
    const table = document.getElementById("salesTable");

    head.innerHTML = `
        <tr>
            <th>Product Name</th>
            <th>Quantity Sold</th>
        </tr>
    `;

    table.innerHTML = "";

    if (Object.keys(grouped).length === 0) {
        table.innerHTML = "<tr><td colspan='2'>No data</td></tr>";
        return;
    }

    Object.keys(grouped).forEach(p => {
        table.innerHTML += `
            <tr>
                <td>${p}</td>
                <td>${grouped[p]}</td>
            </tr>
        `;
    });
}

function renderTableProductFull(grouped) {

    const head = document.getElementById("tableHead");
    const table = document.getElementById("salesTable");

    head.innerHTML = `
        <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Quantity Sold</th>
        </tr>
    `;

    table.innerHTML = "";

    const keys = Object.keys(grouped);

    if (keys.length === 0) {
        table.innerHTML = "<tr><td colspan='3'>No data</td></tr>";
        return;
    }

    keys.forEach(id => {
        table.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${grouped[id].name}</td>
                <td>${grouped[id].qty}</td>
            </tr>
        `;
    });
}


// 🔥 CHART
function renderChart(labels, values, labelName) {

    const canvas = document.getElementById("salesChart");

    if (!canvas) {
        console.error("Canvas not found!");
        return;
    }

    if (chart) chart.destroy();

    chart = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: labelName,
                data: values,
                backgroundColor: '#3498db'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


// AUTO LOAD
window.onload = function () {
    loadSales();
};