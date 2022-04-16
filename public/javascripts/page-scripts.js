
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


