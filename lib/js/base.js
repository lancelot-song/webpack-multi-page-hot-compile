import '../css/base.css';
import $ from "expose-loader?$!./jquery.js"; 

$(function(){

    //侧栏滑动监听
    var $fixed = $("#public_sides");
    var oscroll=function(){

        if($(document).scrollTop()>=104){
            $("#head").css({
                "height":"90px"
            }).parent().css({
                "background-color":"rgba(255,255,255,0.9)"
            });
        }else{
            $("#head").css({
                "height":"104px"
            }).parent().css({
                "background-color":"rgba(255,255,255,.3)"
            });
        }

        if($(window).width()>1650){
            $fixed.show();
        }else{
            $fixed.hide();
            return false;
        }

        if($(document).scrollTop()>=372){
            $fixed.attr("style","position:fixed;top:245px;display:block;");
        }else{
            $fixed.attr("style","display:block;");
        }

    }
    $(window).load(function(){ oscroll() });
    $(window).scroll(function(){ oscroll() });
    $(window).resize(function(){ oscroll() });

    //顶部搜索交互
    var $searchSubmit = $("#search_form .search-submit"),
        $searchInput = $("#search_form .search-input");

        $searchSubmit.click(function(){
            if( $searchInput.hasClass("show") ){
                var $input = $searchInput.find("input");
                if( $input.val()!="" ){
                    $("#search_form").submit();
                    $input.val("")
                }
            }else{
                $searchInput.find("input").focus();
            }
            $searchSubmit.toggleClass("show");
            $searchInput.toggleClass("show");
        })

    //头部导航切换
    var $navLink = $("#head .nav a");
    $navLink.click(function(){
        $navLink.removeClass("active");
        $(this).addClass("active");
    })
})