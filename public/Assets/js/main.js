

     $("*").delegate('#todoModal','shown.bs.modal', function (event) { 
         var button = $(event.relatedTarget) ;// Button that triggered the modal
        var recipient = button.data('whatever');
        var index=button.data('index');
        /*
        $('#idlist').text( recipient);
        $('#todoModalLabel').text('New Todo for List ' + recipient);
        */
         var modal = $(this)
        modal.find('.modal-title').text('New Todo for List: ' + recipient)
        modal.find('.modal-body .list_class').val(recipient)
        //ng-init="list_index=" idListHidden
        modal.find('.modal-body .list_class').attr("ng-init","list_index='"+index+"'")
        
        modal.find('.modal-body #idListHidden').val(index)
        
  
    $("#datepicker").datepicker({
          format: 'YYYY-MM-DD',
    });
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

 