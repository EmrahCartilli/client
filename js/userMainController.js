+$(document).ready( () => {
+

+    const history = $(".ordersContainer");
+    SDK.Items.getAll( (err, items) => {
+        if (err) {
    +            return window.location.href = "index.html";
    +        }
+
    +        let total = 0;
+        let OrderGridRowSpan = 2;
+        let itemsInBag = [];
+
    +
        +
            +//indkøbskurven
                +        $(".orderOverview").addClass('fadeIn');
+
    +        for(let i = 0 ; i < items.length ; i++){
    +            let item = items[i];
    +
        +            $(".itemsContainer").append(
            +               `<div class='items animated fadeIn' data-id='${item.itemId}' data-index='${i}' data-name='${item.itemName}' data-price='${item.itemPrice}'>
 +                <img src=lib/${item.itemName.replace(' ', '-')}.jpg>
 +                <p>${item.itemName}</p>                     
 +                <p>${item.itemPrice} DKK.</p>
 +                </div>`)
    +        }
+
    +
        +        $(".items").on('click', function() {
            +
                +            itemsInBag.push(items[$(this).data('index')]);
            +
                +
                    +            height = $(".orderOverview").height();
            +
                +
                    +            $("#total").before("<h3 class='baggedItem'>" +$(this).data('name')+"</h3><h3 class='baggedItem' style='align-self: flex-end'>"+$(this).data('price')+" DKK</h3>");
            +
                +
                    +            total += parseInt($(this).data('price'));
            +            $('.amount').text(total + " DKK");
            +
                +
                    +            if (height !== $(".orderOverview").height() ) {
                +                $(".orderOverview").css('grid-area', 'span '+ ++OrderGridRowSpan +' / span 3 / 3 / -1');
                +            }
            +        });
+
    +
        +
            +        $(".sendOrder").on('click', () => {
+
+            if (itemsInBag.length !== 0) {
    +
        +                let confirm = window.confirm("Confirm your order?");
    +                if (confirm) {
        +
            +                    SDK.Orders.create(itemsInBag, () => {
        +                        window.alert("Success we got your order. It will be ready in 15 min.,");
        +                        total = 0;
        +                        $(".baggedItem").remove();
        +                        $('.amount').text(total + " DKK");
        +                    })
        +                }
    +
        +            } else  {
    +                window.alert("Empty order!")
    +            }
+        })
});
+//viser brugerens tidligere ordrer
    +    $("#history").on('click', () => {
+        $(".ordersContainer").empty();
+        $(".itemsContainer").hide();
+        $(".ordersContainer").show();
+        SDK.Orders.getByUserId( (err, orders) => {
+            if (err)
    +                return alert("Empty history!");
+
    +            for (let i = 0 ; i < orders.length ; i++) {
    +
        +                let order = orders[orders.length - i - 1];
    +                let items = order.items;
    +                let total = 0;
    +                isReady= () => {
        +                    if(order.isReady === true) {
            +                        return "class= 'ready' > Your order is ready!"
                +                    } else {
            +                        return "class= 'notReady' >  Your order is not ready yet!"
                +                    }
        +                };
    +                $(".ordersContainer").append(
        +                    `<div class='order animated fadeIn' data-id = ${order.orderId}> 
 +                    <h2 ${isReady()}</h2><br>
 +                    <p> Bestilt: </p>
 +                    <p> ${order.orderTime}</p><br>
 +                    <table>
 +                        <tr>
 +                            <th>Produkter:</th>
 +                            <th>Pris:</th>
 +                        </tr>
 +                    </table>
 +                   </div>`
        +                );
    +                for (let j = 0 ; j < items.length ; j++) {
        +                    let item = items[j];
        +                    total += item.itemPrice;
        +                    $('*[data-id='+ order.orderId +'] table').append(
            +                        `<tr>
 +                        <td>
 +                            ${item.itemName}
 +                        </td> 
 +                        <td>
 +                            ${item.itemPrice} DKK
 +                        </td>
 +                    </tr>`
            +                    )
        +                }
    +
        +                $(`<h4>Total price:  <span style="position: absolute; right: 12%;">${total} DKK</span></h4>`).insertBefore('*[data-id='+ order.orderId +'] table')
    +            }
+        });
+    });
}
+        });
+    });
+
    +    $("#newOrder").on('click', () => {
+        $(".ordersContainer").hide().empty();
+        $(".itemsContainer").show();
+    });
+
    +
        +    $(".logout").on('click', () => {
+        SDK.logOut( () => {
+            this.total = 0;
+            $(".ordersContainer").empty();
+            $(".baggedItem").remove();
+            $('.amount').text(total + " DKK");
+
    +            window.location.href = "index.html";
+        })
+    })
+});