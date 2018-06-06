$(function () {
    //nav 部分start
    $(".nav-kinds a").eq(10).focus(function () {
        $(".nav-kinds-more").show();
    })
    $(".nav-kinds a").eq(10).blur(function () {
        $(".nav-kinds-more").hide();
    })
    $(".nav-login-firsta").on("mouseenter",function () {
        $(".nav-doubanApp").css({"display":"block"});
    });
    $(".nav-login-firsta").on("mouseleave",function () {
        $(".nav-doubanApp").css({"display":"none"});
    });
    //nav 部分end

    //books 部分start
    var newbooksUlLength = $(".newbooks-first-ul").width();
    var newbooksIndex = 0;
    $(".newbooks-dot1").click(function () {
        $(".newbooks-first-ul>ul").animate({"left":0});
    });
    $(".newbooks-dot2").click(function () {
        $(".newbooks-first-ul>ul").animate({"left":-newbooksUlLength});
    });
    $(".newbooks-dot3").click(function () {
        $(".newbooks-first-ul>ul").animate({"left":-newbooksUlLength*2});
    });
    $(".newbooks-dot4").click(function () {
        $(".newbooks-first-ul>ul").animate({"left":-newbooksUlLength*3});
    });
    $(".newbooks-left").click(function () {
        newbooksIndex--;
        newbooksIndex = validate(newbooksIndex,4);
        if(newbooksIndex == 4) {
            $(".newbooks-first-ul>ul").css({"left":-newbooksUlLength*newbooksIndex});
            newbooksIndex--;
        }
        $(".newbooks-first-ul>ul").animate({"left":-newbooksUlLength*newbooksIndex});
    });
    $(".newbooks-right").click(function () {
        newbooksIndex++;
        newbooksIndex = validate(newbooksIndex,4);
        if(newbooksIndex == 0) {
            $(".newbooks-first-ul>ul").css({"left":0});
            newbooksIndex++;
        }
        $(".newbooks-first-ul>ul").animate({"left":-newbooksUlLength*newbooksIndex});
    });
    function validate(index,max) {
        if(index<0) {
            index = max;
        }else if(index>max){
            index = 0;
        }
        return index;
    }

    var booksInfoUlLength = $(".books-info-ul").width();
    var booksInfoIndex = 0;
    $(".booksInfo-dot1").click(function () {
        $(".books-info-ul>ul").animate({"left":0});
    });
    $(".booksInfo-dot2").click(function () {
        $(".books-info-ul>ul").animate({"left":-booksInfoUlLength});
    });
    $(".booksInfo-dot3").click(function () {
        $(".books-info-ul>ul").animate({"left":-booksInfoUlLength*2});
    });
    $(".booksInfo-dot4").click(function () {
        $(".books-info-ul>ul").animate({"left":-booksInfoUlLength*3});
    });
    $(".booksInfo-left").click(function () {
        booksInfoIndex--;
        booksInfoIndex = validate(booksInfoIndex,4);
        if(booksInfoIndex == 4) {
            $(".books-info-ul>ul").css({"left":-booksInfoUlLength*booksInfoIndex});
            booksInfoIndex--;
        }
        $(".books-info-ul>ul").animate({"left":-booksInfoUlLength*booksInfoIndex});
    });
    $(".booksInfo-right").click(function () {
        booksInfoIndex++;
        booksInfoIndex = validate(booksInfoIndex,4);
        if(booksInfoIndex == 0) {
            $(".books-info-ul>ul").css({"left":0});
            booksInfoIndex++;
        }
        $(".books-info-ul>ul").animate({"left":-booksInfoUlLength*booksInfoIndex});
    });
    function validate(index,max) {
        if(index<0) {
            index = max;
        }else if(index>max){
            index = 0;
        }
        return index;
    }

    $(".electric-books li").each(function (index,ele) {
        $(ele).on("mouseover",function () {
            $(this).find(".books-introduction").show();
        });
        $(ele).on("mouseout",function () {
            $(this).find(".books-introduction").hide();
        });
    });
    //books 部分end
})
