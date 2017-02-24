$(document).ready(function() {

  // HEADER CHANGE
  $(window).on('scroll', function() {
    windowTop = $(document).scrollTop();
    header = $('.main-header');

    if (windowTop > 300) {
      header.addClass('header-white');
    } else {
      header.removeClass('header-white');
    }
  });

  //SMOOTH SCROLL
  $('.smooth').on('click', function(e) {
    if (e.currentTarget.hash !== '') {
      e.preventDefault();
      hash = e.currentTarget.hash;
      offset = $(`${hash}`).offset();
      $('html, body').animate({
        scrollTop: offset.top,
      }, 800, () => {
        window.location.hash = hash;
      });
    }
  });

  //SLIDER
  var slideCount = $('#slider ul li').length;
	var slideWidth = $('#slider ul li').width();
	var slideHeight = $('#slider ul li').height();
	var sliderUlWidth = slideCount * slideWidth;

	$('#slider').css({ width: slideWidth, height: slideHeight });

	$('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });

    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveLeft() {
        $('#slider ul').animate({
            left: + slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    function moveRight() {
        $('#slider ul').animate({
            left: - slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    $('a.control_prev').click(function (e) {
        e.preventDefault();
        moveLeft();
    });

    $('a.control_next').click(function (e) {
        e.preventDefault();
        moveRight();
    });
})
