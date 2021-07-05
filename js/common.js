$(document).ready(function () {
  /* 로딩이 완료되면 함수 실행. */
  $("a.s_point").smoothScroll();

  // 모바일 메뉴 띄움
  /* 위쪽에서 800 아래로 내려 갈 때 메뉴를 어떻게 할 것인지 설정했다.
  그래서 모바일 화면에서는 원래의 gnb가 openMOgnb로 대체되고 클릭했을 때 header에 on클래스를 주고
  빠르게 슬라이드 다운(위에서 내려오는)에 이상하게 동작하지 말라고 body 태그에 버블을 방지용 preventDefault를 추가해 줬다.
  이거 안 넣어주면 예를 들어 모달이나 라이트박스 같은게 같이 실행될 수 있기 때문이다. 지금 TOP3 메뉴가 누르면 창이 뜨게 해놨는데
  그게 클릭 될 수 있음.
   */
  
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
    observer: true,
    observerParents: true,
    loop: false,
    loopFillGroupWidthBlank: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1000: {
        slidesPerView: 4.2,
        slidesPerGroup: 4,
        spaceBetween: 15,
      },
      799: {
        slidesPerView: 3.3,
        slidesPerGroup: 3,
        spaceBetween: 5,
      },
      489: {
        slidesPerView: 2.5,
        slidesPerGroup: 2,
        spaceBetween: 5,
      },
      
    }
  });
});

$(function() {
  /* 팝업 관련 설정. */
  $('.popup_base .btn_xpop >a').click(function () {
    $(this).parents('.popup_base').hide();
    $(this).parents('.pop_content').find('.player')[0].contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
  });
});