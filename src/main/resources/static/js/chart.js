let chart;

function drawChart(labels, data) {
    if(chart) chart.destroy();

    const ctx = document.getElementById("stockChart");

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Stock Quantity",
                data: data
            }]
        }
    });
}

// Load initially
window.onload = () => {
    loadProducts();
    loadSuppliers();
};