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

  // 프로그램 소개 - 더보기 / 접기 작동
  $(".program_list li .btn_more a").click(function () {
    /* ~~~의 a 태그가 클릭되면 그 위로 2번째 조상요소에서 .subtxt 라는 클래스를 찾아서 그 요소의 css 가 dn이면
    그 요소의 css를 di로 변경
    그리그 ~~~의 a 태그에 '접기'텍스트 삽입.
    아니면 아래 실행.
     */
    if ($(this).parent().parent().find(".subtxt").css("display") == "none") {
      $(this).parent().parent().find(".subtxt").css("display", "inline");
      $(this).text("접기");
    } else {
      $(this).parent().parent().find(".subtxt").css("display", "none");
      $(this).text("더보기");
    }
  });
});

/* main 페이지 버튼 */
$(function() {
  var next = $('.mainM .mainI .next');
  var prev = $('.mainM .mainI .prev');
  var mItem = $('.mainM .mainI');
  var frame = mItem.width();
  var sItem = $('.subM .subI');
  var sc = sItem.length;
  var mc = mItem.length;
  var w = sItem.width();
  var cnt = 0;

  // var vc = Math.floor(frame / w);
  var vc = Math.ceil(frame / w);
  var cont = Math.round(sc / (vc * mc));

  function itemSort() {
    for (var i in mItem) {
      for (var j in sItem) {
        mItem.eq(i).find(sItem).eq(j).css({ left: j * w });
      }
    }
  }
  itemSort();
  
  /* 리사이즈 했을 때 리스트 넘김 초기화 */
  $(window).resize(function() {
    itemSort();
    /* 리사이즈 했을 때 버튼 및 카운트 초기화*/
    next.show();
    prev.hide();
    cnt = 0;

    frame = mItem.width();
    vc = Math.ceil(frame / w);
    cont = Math.round(sc / (vc * mc));
    
    return frame, vc, cont;
  });
    
  /* 마우스 올렸을 때 애니메이션 */
  next.mouseover(function(){
    $(this).parent().find(sItem).stop().animate({left: '-=20'}, 'fast');
    $(this).parent().find(sItem).animate({left: '+=20'}, 'fast');
  });
  prev.mouseover(function(){
    $(this).parent().find(sItem).stop().animate({left: '+=20'}, 'fast');
    $(this).parent().find(sItem).animate({left: '-=20'}, 'fast');
  });

  /* 버튼 클릭시 */
  next.click(function(){
    cnt++;
    $(this).parent().find(sItem).stop().animate({left: '-=100%'}, 'fast');
    if(cnt === cont){
      $(this).hide();
    }
    $(this).siblings(prev).show();
    return cnt;
  });
  
  prev.click(function(){
    $(this).parent().find(sItem).stop().animate({left: '+=100%'}, 'fast');
    /* if문을 사용하지 않는 방법 찾아보기. */
    if(cnt == 1){
      $(this).hide();
    }
    $(this).siblings(next).show();
    cnt--;
    return cnt;
  });

  /* 팝업 관련 설정. */
  $('.popup_base .btn_xpop >a').click(function () {
    $(this).parents('.popup_base').hide();
    $(this).parents('.pop_content').find('.player')[0].contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
  });
});