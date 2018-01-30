import '../css/index.css';
import '../css/anythingslider.css';
import $ from "expose-loader?$!./jquery.js"; 
import $slider from "./jquery.anythingslider.min.js";

$(function(){

    var $bannerSlider = {
        dom : $(".banner-wrap"),
        html : "",
        width : "",
        height :　""
    };
    $bannerSlider.html = $bannerSlider.dom.html();
    var initFirstBanner = function(){
        $bannerSlider.width = $("body").width();
        $bannerSlider.height = $bannerSlider.width * 0.47;
        $(".banner-wrap,#banner_slider,#banner_slider a,#banner_slider .banner_big").css({
            "width" : $bannerSlider.width + "px",
            "height" : $bannerSlider.height + "px"
        })
        $('#banner_slider').anythingSlider({
            mode:"f",
            theme:"cs-portfolio",
            resizeContents:false,
            navigationsize:false,
            buildStartStop:false,
            autoPlay:true,
            pauseOnHover: false,
            buildArrows:true,
            buildnavigation:false,
            startPanel:0,
            delay:6000,
            hashTags: false,
            autoPlayLocked:false,
            resumeDelay: 3000
        });
    };
    initFirstBanner();
    $(window).resize(function(){
        $bannerSlider.dom.html($bannerSlider.html);
        initFirstBanner();
    })
    // $('#news_slider').anythingSlider({
    //     theme:"cs-portfolio",
    //     navigationsize:false,
    //     buildStartStop:false,
    //     autoPlay:true,
    //     pauseOnHover: false,
    //     buildArrows:true,
    //     buildnavigation:false,
    //     startPanel:0,
    //     delay:6000,
    //     hashTags: false,
    //     autoPlayLocked:false,
    //     resumeDelay: 2000
    // });
    $('#spots_slider').anythingSlider({
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
        delay:6000,
        hashTags: false,
        autoPlayLocked:false,
        resumeDelay: 2000
    });
});