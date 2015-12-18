

     $("*").delegate('#todoModal','shown.bs.modal', function (event) { 
         var button = $(event.relatedTarget) ;// Button that triggered the modal
        var recipient = button.data('whatever');
        /*
        $('#idlist').text( recipient);
        $('#todoModalLabel').text('New Todo for List ' + recipient);
        */
         var modal = $(this)
        modal.find('.modal-title').text('New Todo for List: ' + recipient)
        modal.find('.modal-body .list_class').val(recipient)
     });
    $( document ).ready(function() {
    
    
});
 