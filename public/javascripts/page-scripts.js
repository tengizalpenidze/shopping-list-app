
$(".delete-button").click(function(){
    console.log($(this).val());
    var button = $(this);
    $.post("/delete-list", {
        "shopping_list_id" : $(this).val()
        
    },function(data, status){
        //alert("Data: " + data + "\nStatus: " + status);
        button.closest('.ta-container').remove();
    });
});


$(".mark-shopping-done-button").click(function(){
    let amountPayed = Number($(this).parent().parent().find('input.form-control').val());
    if(amountPayed){
        console.log("cvadasdas");
    }else{
       console.log( typeof(amountPayed));
    }
    
    $.post("/mark-list-bought", {
        "shopping_list_id" : $(this).val(),
        "amount_payed":    amountPayed 
        
    },function(data, status){
        console.log(data);
    });
});
