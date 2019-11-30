$( document ).ready(function() {
    
    // CK Editor
    CKEDITOR.replace( 'ckeditor' );

    // Add to Cart
    var total = 0;
    $('.add-to-cart').on( "click", function() {
        productTitle = $(this).data('product-title');
        productPrice = $(this).data('product-price');
        
        // Update Total
        total = ((productPrice * 10)/10) + total;
        $('#total').html( total );

        // Add Product to list
        $('#product-list').append('<li>'+ productTitle +'</li>');
    });

});