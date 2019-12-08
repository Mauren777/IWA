var total = 0;
function draw_table()
{
	$("#results").empty();
	$.getJSONuncached = function (url)
	{
		return $.ajax(
		{
			url: url,
			type: 'GET',
			cache: false,
			success: function (html)
			{
				$("#results").append(html);
                select_row();
                edit_row();
			}
		});
	};
	$.getJSONuncached("/get/html")
};

function draw_shop()
{
	$("#shop-list").empty();
	$.getJSONuncached = function (url)
	{
		return $.ajax(
		{
			url: url,
			type: 'GET',
			cache: false,
			success: function (html)
			{
				$("#shop-list").append(html);
                
                $('.add-to-cart').click(function() {

                    productTitle = $(this).data('product-title');
                    productPrice = $(this).data('product-price');
                    
                    // Update Total
                    total = ((productPrice * 10)/10) + total;
                    $('#total').html( total );

                    // Add Product to list
                    $('#product-list').append('<div class="col-md-12"><h5>'+ productTitle +'</h5><hr/></div>');
                });
			}
		});
	};
	$.getJSONuncached("/get/shop")
};

function select_row()
{
	$("#adminTable tbody tr[id]").click(function () {
        
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
        var entree = $(this).attr("id") - 1;
        console.log("selected", entree);
		delete_row(entree);
    })
};

function delete_row(ent)
{
	$("#delete").click(function ()
	{
		$.ajax(
		{
			url: "/post/delete",
			type: "POST",
			data:
			{
				product: ent
			},
			cache: false,
			success: setTimeout(draw_table, 1000)
		})
	})
};

function edit_row() {
    var productId;
    $('.edit-row').click(function() {
        productId = $(this).data('product-id');
        
        var editInfo = $('tr#'+productId+' td').map(function() {
            return $(this).text()
        });

        $('input[name=title]').val(editInfo[1]);
        $('textarea[name=description]').val(editInfo[2]);
        $('input[name=price]').val(editInfo[3]);

        $('button[type=submit]').prop('disabled', true);
        $('button[id=edit]').prop('disabled', false);
        console.log(productId, editInfo);
    });
    $('#edit').click(function() {
        var editTitle = $('input[name=title]').val(),
            editDescription = $('textarea[name=description]').val(),
            editPrice = $('input[name=price]').val();
        console.log("Edit",productId, editTitle, editDescription, editPrice);
        $.ajax(
        {
            url: '/post/update',
            type: 'POST',
            data:
			{
                id: productId,
                title:  editTitle,
                description: editDescription,
                price: editPrice
			},
			cache: false,
			success: function() {
                $('button[type=submit]').prop('disabled', false);
                $('button[id=edit]').prop('disabled', true);

                $('input[name=title]').val(""),
                $('textarea[name=description]').val(""),
                $('input[name=price]').val("");

                $("#shop-list").empty();
                setTimeout(draw_table, 1000);
            }
        })
    });
}



$( document ).ready(function() {

    draw_shop();
    draw_table();

});