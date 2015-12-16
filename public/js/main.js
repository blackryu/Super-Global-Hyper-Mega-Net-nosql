$('#myModal').on('shown.bs.modal', function () {
  //$('#myInput').focus()
    var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever')
  
    var modal = $(this)
  modal.find('.modal-title').text('New Todo for List ' + recipient)
  modal.find('.modal-body input').val(recipient)
})