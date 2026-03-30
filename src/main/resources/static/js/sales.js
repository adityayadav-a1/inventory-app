function makeSale() {
    fetch(API + "/sales", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            productId: +saleProductId.value,
            quantity: +saleQty.value
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
