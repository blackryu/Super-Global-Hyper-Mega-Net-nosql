

     $("*").delegate('#todoModal','shown.bs.modal', function (event) { 
      
         var button = $(event.relatedTarget) ;// Button that triggered the modal
        var recipient = button.data('whatever');
        var index=button.data('index');
       
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
  $("*").delegate('#todoModalEdit','shown.bs.modal', function (event) { 
      
         var button = $(event.relatedTarget) ;// Button that triggered the modal
        var active = button.data('active');
        var index=button.data('index');
       var date=button.data('date');
       var todoname=button.data('todo');
         var modal = $(this)
        modal.find('.modal-title').text('Edit Todo ')
        //ng-init="list_index=" idListHidden
        
        modal.find('.modal-body #idListHidden').val(index)
         modal.find('.modal-body #active').val(active)
         
  modal.find('.modal-body #todo_name').val(todoname)
  
  modal.find('.modal-body #duedatepicker').val(date)
    $("#datepicker").datepicker({
          format: 'YYYY-MM-DD',
    });
});


