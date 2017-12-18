$(window).ready(() => {

    //metode som henter alle ordrer
    SDK.Orders.getAll((err, orders) => {
    if(err)
    return window.location.href = "index.html";

for (let i = 0 ; i < orders.length ; i++) {
    let order = orders[i];
    let items = order.items;
    let total = 0;
    isReady= () => {
        if(order.isReady === true) {
            return "class= 'ready' >Ready"
        } else {
            return "class= 'notReady'>Not ready"
        }
    };
    $(".ordersContainer").append(
        `<div class='order animated fadeIn' data-id = ${order.orderId}> 
                <h2 ${isReady()}</h2><br>
                <p> Ordered: </p>
                <p> ${order.orderTime}</p><br>
                <table>
                    <tr>
                        <th>Products:</th>
                        <th>Price:</th>
                    </tr>
                </table>
            </div>`
    );
    for (let j = 0 ; j < items.length ; j++) {
        let item = items[j - items.length - 1];
        total += item.itemPrice;
        $('*[data-id='+ order.orderId +'] table').append(
            `<tr>
                        <td>
                            ${item.itemName}
                        </td> 
                        <td>
                            ${item.itemPrice} DKK.
                        </td>
                    </tr>`
        )
    }

    $(`<h4>Total price:  <span style="position: absolute; right: 12%;">${total} DKK.</span></h4>`).insertBefore('*[data-id='+ order.orderId +'] table')
}


});




$(".logout").on('click', () => {
    SDK.logOut( () => {
    this.total = 0;

window.location.href = "index.html";
})
});
});
