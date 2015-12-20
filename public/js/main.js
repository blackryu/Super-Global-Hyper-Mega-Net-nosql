

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
        /*
    $(".prev .next .day").addClass('unit');
     })
     $( document ).ready(function() {
    $("#datepicker").datepicker();*/
});
/*     jQuery.noConflict();
$('.datepicker').datepicker({
    format: 'mm/dd/yyyy',
    startDate: '-3d'
})*/
  /*
!function ($) {
  $(function(){
       $('.checkbox input').iCheck({
        checkboxClass: 'icheckbox_flat',
        increaseArea: '20%'
    });

    $('.radio input').iCheck({
        radioClass: 'iradio_flat',
        increaseArea: '20%'
    });
  })
}(window.jQuery)
 */

 