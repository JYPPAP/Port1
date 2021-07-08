$(document).ready(function () {
  $("a.s_point").smoothScroll();
  $(".openMOgnb").click(function () {
    $("header").addClass("on");
    $("header .header_cont").slideDown("fast");
    $("header .header_area .header_cont .closePop").show();
    $("body").bind("touchmove", function (e) {
      e.preventDefault();
    });
  });
  $('.closePop').click(function () {
    $("header .header_cont").hide();
    $('header').removeClass("on");
  });
});

$(document).ready(function () {
  // PC 브라우저에서 좁혀서 메뉴 닫고 다시 넓힐 때 상단 메뉴 노출되게 설정.
  $(window).resize(function () {
    /* 리사이즈 이벤트를 넣어서 화면의 크기가 변경되면 (header의 너비가 800 이상일 때) header_cont를 보이게 설정. */
    if (parseInt($("header").css("width")) > 800) $(".header_cont").show();
  });
  
  /* Menu alert */
  var $altMenu1 = $('#header .header_cont .gnb li:nth-child(3) a');
  // var altMenu2 = $('#header .header_cont .gnb li').nthChild(4);
  
  /* 슬라이더 작동을 위한 JS */
  $(document).ready(function () {
    var swiper = new Swiper(".main_rolling_mobile .swiper-container", {
      loop: true,
      autoplay: 5500,
      autoplayDisableOnInteraction: false,
      pagination: ".swiper-pagination",
      paginationClickable: true,
    });
  });
});

/* 슬라이드 아이템 */
$(document).ready(function () {
  var mySwiper = new Swiper(".mainM .swiper-container", {
    slidesPerView: "auto",
    observer: true,
    observerParents: true,
    loop: false,
    loopFillGroupWidthBlank: true,
  });
});

$(function() {
/* 팝업 관련 설정. */
  $('.popup_base .btn_xpop >a').click(function () {
    $(this).parents('.popup_base').hide();
    $(this).parents('.pop_content').find('.player')[0].contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
  });
});