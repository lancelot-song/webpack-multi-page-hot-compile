import '../css/plandesign.css';
import '../css/anythingslider.css';
import $ from "expose-loader?$!./jquery.js"; 
import $slider from "./jquery.anythingslider.min.js";

$(function(){
    $('#feature_slider').anythingSlider({
        theme:"cs-portfolio",
        expand : true, 
        showMultiple : 3,
        navigationsize:false,
        buildStartStop:false,
        autoPlay:true,
        pauseOnHover: false,
        buildArrows:true,
        buildnavigation:false,
        startPanel:0,
        delay:15000,
        hashTags: false,
        autoPlayLocked:false,
        resumeDelay: 2000
    });
    
    //初始化经典案例动画
    var $case = $("#case_list .case-list"),
        setAnimate;
    $case.each(function(index){
        index+=1;
        $(this).addClass("case-list-0"+index);
    })
    $case.mouseover(function(){

        var numBefore = $(this).index(),
            numAfter = $case.length;

        setAnimate = setTimeout(function(){
            $case.slice( 0, numBefore ).each(function(index){
                var leftPx = index*146+"px";
                $(this).animate({
                    "left" : leftPx,
                    "width" : "146px"
                })
            });
            $case.slice( numBefore, numAfter ).each(function(index){
                var leftPx = (numBefore+index)*146+"px";
                $(this).animate({
                    "left" : leftPx,
                    "width" : "860px"
                })
            });
        },150);

    }).mouseout(function(){
        clearTimeout(setAnimate);
    })
});