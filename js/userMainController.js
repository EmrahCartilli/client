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
            +
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
