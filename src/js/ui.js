var UI = {
  burger: {
    trigger: function() {
      if ( $('.burger').prop('burgered') ) {
        $('.burgerMenu').css('right', '-100%');
        $('.burger').prop('burgered', false);
      } else {
        $('.burgerMenu').css('right', '0');
        $('.burger').prop('burgered', true);
      }
    }
  }
}