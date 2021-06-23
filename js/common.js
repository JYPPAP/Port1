$(document).ready(function () {
  /* 로딩이 완료되면 함수 실행. */
  $("a.s_point").smoothScroll();

  /* 스크롤하여 내려와야 top 버튼이 보이도록 함.
  첫 상태는 탑버튼이 퀵메뉴 아래에 붙어있다가 일정한 위치가 되면 붙어있던걸 화면 하단으로 옮겨놔야 하기 때문이다.
   */
  if ($(document).scrollTop() < 50) $(".to_top").addClass("hide");
  else $(".to_top").removeClass("hide");
  $(window).scroll(function () {
    if ($(document).scrollTop() < 50) $(".to_top").addClass("hide");
    else $(".to_top").removeClass("hide");
  });
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

/* about_area 의 박스요소를 클릭했을 때 modal 창 출력될 수 있게 만들기.
  > 현재 html 파일에 들어있는 내용을 스크립트 파일로 옮기기.
 */
$(document).ready(function () {
  $('.about_area .place_list li >a').click(function(e){
    // e.preventDefault();
    console.log('click');
    $('.popup_base').css('height', $(document).height());
    $('.contact_pop').show();
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

  var vc = Math.ceil(frame / w);
  var cont = (sc / (vc * mc));
  console.log(vc);
  console.log(cont);
  /* #문제 0
  test의 결과값은 소숫점(2.2)으로 출력된다. 그러면 정수값과 나머지를 이용해서 끝부분이 오른쪽 끝에 올 수 있도록 만들 수 있을 것 같다. 
  너비가 1000이니 next 버튼을 눌렀을 때 .2 * 100px 을 이동시키면 될
  */
  
  /* 슬라이드 배치 
  #문제1
  즉시실행도 써보고, 함수명을 준 다음 실행하는 방법도 써보고 onload도 써봤는데 이게 제일 정상이다.
  즉시실행쓰면 화면 확대후 넘긴 다음. 다시 축소했을 때 너비가 깨진다. > 리사이즈가 안되고 1회 실행만 되고 끝남.
  일단 코드 반복사용을 하고, 그 다음. 나중에 문제해결을 해야할 것 같다. 일단 만들고 보자.
  현 상황은 최초실행될 부분과, 화면 크기변경시 너비를 자동으로 변경해 줄 수 있도록 만들었다.
  */
  for (var i in mItem) {
    for (var j in sItem) {
      mItem.eq(i).find(sItem).eq(j).css({ left: j * w });
    }
  }
  /* 리사이즈 했을 때 리스트 넘김 초기화 */
  $(window).resize(function() {
    for (var i in mItem) {
      for (var j in sItem) {
        mItem.eq(i).find(sItem).eq(j).css({
          left: j * w
        });
      }
    }
    /* 리사이즈 했을 때 버튼 초기화*/
    /*
    현재 화면에 있는 사진들이 화면이 확대되어 보여지는 개수가 4.5
    정도에서 4개까지 줄어들었을 때 내가 원하는 값이 나오지 않고있다.
    그걸 해결하기 위해서 resize이벤트 안에 새로 값을 구해서 반환하도록 작성했는데, 정상적으로 동작하지 않고 있다.
    오류가 나지 않는걸 보면 정상적으로 반환되는것도 같은데....
    */
    next.show();
    prev.hide();
    cnt = 0;
    frame = mItem.width();
    vc = Math.ceil(frame / w);
    cont = (sc / (vc * mc));
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
    if(cnt >= parseInt(cont)){
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