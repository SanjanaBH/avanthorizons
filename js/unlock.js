$(document).ready(function() {
    timer = setInterval(function() {
        var wrapper = ['slider-content'];
        rotateWords(wrapper);
    }, 2500);
});
var timer;

function rotateWords(wrapper) {
    for (var i = 0; i < wrapper.length; i++) {
        var ele, eleIndex, totalWordsToRotate;
        totalWordsToRotate = $('.' + wrapper[i] + ' .word-rotate-wrapper .rotate-word').length;
        ele = $('.' + wrapper[i] + ' .word-rotate-wrapper .rotate-word.show');
        eleIndex = ele.index() + 1;
        ele.removeClass('show');
        if (eleIndex == totalWordsToRotate) {
            eleIndex = 1;
            $('.' + wrapper[i] + ' .word-rotate-wrapper .rotate-word:nth-child(' + eleIndex + ')').addClass('show');
        } else {
            $('.' + wrapper[i] + ' .word-rotate-wrapper .rotate-word:nth-child(' + (eleIndex + 1) + ')').addClass('show');
        }
    }
}
$(function() {

    /*Fixed Header*/
    var scrollcheck = 0;

    function winscroll() {
        var notTop = $(window).scrollTop() > ($('#banner').length ? $('#banner').offset().top : 0) + ($('#header').height() || 0),
            notBottom = document.body.scrollHeight != $(window).height() + $(window).scrollTop();
        if (notTop && notBottom) {
            $('#header').addClass('in');
            if ($('#banner').length && notTop)
                $('#header').removeClass('homemenutop');
        } else {
            $('#header').removeClass('in');
            if ($('#banner').length && $(window).scrollTop() <= $('#banner').height() + $('#banner').height())
                $('#header').addClass('homemenutop');
        }
        if (document.body.scrollHeight == $(window).height() + $(window).scrollTop() && $('#banner').length)
            $('#header').addClass('homemenubottom');
        else
            $('#header').removeClass('homemenubottom');
    }
    if ($(window).width() > 991) {
        if (!$('#banner').length) {
            $('#header').wrap('<div class="affix-wrap" />').closest('.affix-wrap').height($('#header').height());
        } else {
            $('#header').addClass('homemenu');
        }
        $('#header').addClass('fix');
        scrollcheck = $(window).scrollTop();
        winscroll();
        $(window).scroll(function() {
            winscroll();
        });
    }






    /*Slick Slider*/

    $('#bannerSlider, #projectSlider, #floorPlan').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        dots: true,
        arrows: false,
        useTransform: false,
        loop: true,
        infinite: true,
        fade: true,
        responsive: [{
            breakpoint: 767,
            settings: {
                dots: false,
            }
        }]

    });
    $('#bannerSlider, #blogslider, .project-wrap').on('init', function(e, slick) {
        var $firstAnimatingElements = $('.slick-slide:first-child').find('[data-animation]');
        doAnimations($firstAnimatingElements);
    });


    $('#bannerSlider, #blogslider, .project-wrap').on('beforeChange', function(e, slick, currentSlide, nextSlide) {
        var $animatingElements = $('.slick-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
        doAnimations($animatingElements);
    });

    function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function() {
            var $this = $(this);
            var $animationDelay = $this.data('delay');
            var $animationType = 'animated ' + $this.data('animation');
            $this.css({
                'animation-delay': $animationDelay,
                '-webkit-animation-delay': $animationDelay
            });
            $this.addClass($animationType).one(animationEndEvents, function() {
                $this.removeClass($animationType);
            });
        });
    };


    $('.project-wrap').slick({
        slidesToShow: 2,
        autoplay: true,
        arrows: true,
        slidesToScroll: 1,
        responsive: [

            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $('#blogslider').slick({
        slidesToShow: 2,
        autoplay: true,
        arrows: true,
        slidesToScroll: 1,
        responsive: [

            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }
            }
        ]
    });


    $('.slider-for').each(function(key, item) {

        var sliderIdName = 'slider' + key;
        var sliderNavIdName = 'sliderNav' + key;

        this.id = sliderIdName;
        $('.slider-nav')[key].id = sliderNavIdName;

        var sliderId = '#' + sliderIdName;
        var sliderNavId = '#' + sliderNavIdName;

        $(sliderId).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            asNavFor: sliderNavId,
            fade: true,
            dots: true,
        });

        $(sliderNavId).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: sliderId,
            focusOnSelect: true,
            arrows: false,
            fade: false,
        });

    });


    /*Facts*/
    $(function() {

        if ($('.counter').length > 0) {

            var $section = $('.counter');

            function counter() {

                $('.timer').countTo();
            }

            $(document).bind('scroll', function(ev) {
                var scrollOffset = $(document).scrollTop();
                var containerOffset = $section.offset().top - window.innerHeight;
                if (scrollOffset > containerOffset) {
                    counter();
                    $(document).unbind('scroll');
                }
            });
        }
    });


    /*  Scroll to Top*/

    var scrollToTop = function() {
        var windowWidth = $(window).width(),
            didScroll = false;

        var $arrow = $('#back-to-top');

        $arrow.click(function(e) {
            e.preventDefault();
            $('body,html').animate({
                scrollTop: "0"
            }, 700);
        })

        $(window).scroll(function() {
            didScroll = true;
        });

        setInterval(function() {
            if (didScroll) {
                didScroll = false;
                if ($(window).scrollTop() > $('header').height()) {
                    $arrow.addClass('stuck');
                } else {
                    $arrow.removeClass('stuck');
                }
            }
        }, 250);
    }
    scrollToTop();

    /* Next Section  */

    $('.sticky-nav  a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();

            $('html, body').stop().animate({
                scrollTop: target.offset().top - 78
            }, 1200);
        }
    });

    /*masonry*/

    var $project = $('.mas-wrap').imagesLoaded(function() {
        $project.masonry({
            itemSelector: '.mas-item',
            percentPosition: true,
            columnWidth: '.gutter'
        });
    });
});

//  lightbox
$(function() {
    if ($('.lightbox').length) {
        $('.lightbox').each(function() {
            var options = {
                selector: 'a',
                startClass: '',
                useLeft: true,
                thumbnail: true
            }
            var overrideoptions = $(this).data('options');
            $(this).lightGallery($.extend({}, options, overrideoptions));
        })
    }
    //Animation
    if ($('.wow').length) {
        new WOW().init();
    }
});


//BookASite Visit Form
function LoadBookASiteVisitModalWindow(obj, Project) {
    $.post('Projects/BookASiteVisit', {
        "Project": Project
    }, function(response) {
        $("#BookASiteVisitWrapper").html(response);
        $("#BookASiteVisit").modal('show');
    });
}

function BookASiteVisit(event) {
    event.preventDefault();
    var isValid = true;
    if ($('#txtBSVName').val() == '') {
        isValid = false;
        $('#BSVNameRequired').show();
    } else {
        $('#BSVNameRequired').hide();
    }

    if ($('#txtBSVEmail').val() == '') {
        isValid = false;
        $('#BSVEmailRequired').show();
        $('#BSVEmailVal').hide()
    } else {
        var IsEmailValid = ValidateEmail($('#txtBSVEmail').val());
        if (!IsEmailValid) {
            isValid = false;
            $('#BSVEmailVal').show();
        } else {
            $('#BSVEmailRequired').hide();
            $('#BSVEmailVal').hide()
        }
    }

    if ($('#txtBSVDate').val() == '') {
        isValid = false;
        $('#BSVDateRequired').show();
    } else {
        $('#BSVDateRequired').hide();
    }

    if ($('#ddlBSVTime').val() == '') {
        isValid = false;
        $('#BSVddlTimeRequired').show();
    } else {
        $('#BSVddlTimeRequired').hide();
    }

    if ($('#txtBSVPhoneNo').val() == '') {
        isValid = false;
        $('#BSVPhoneNoRequired').show();
    } else {
        $('#BSVPhoneNoRequired').hide();
    }

    if (isValid) {
        var BSVName = $('#txtBSVName').val();
        var BSVEmail = $('#txtBSVEmail').val();
        var BSVDate = $('#txtBSVDate').val();
        var BSVTime = $('#ddlBSVTime').val();
        var BSVPhoneNo = $('#txtBSVPhoneNo').val();
        $.ajax({
            type: 'POST',
            data: "{'txtBSVName':'" + BSVName + "', 'txtBSVEmail':'" + BSVEmail + "', 'txtBSVDate':'" + BSVDate + "', 'ddlBSVTime':'" + BSVTime + "', 'txtBSVPhoneNo':'" + BSVPhoneNo + "', 'Project':'" + $('#Project').val() + "'}",
            url: "Projects/SubmitBookASiteVisit",
            contentType: 'application/json; charset=utf-8',
            dataType: 'html',
            async: false,
            success: function(result) {
                if (result == "Success") {
                    $("#lblMessageBSV").html("Thank you for your interest.<br/>Your message has been successfully received.")
                    $("#msgDisplayBSV").show();
                    ClearValuesBSV();
                    $('#BSVNameRequired').hide();
                    $('#BSVEmailRequired').hide();
                    $('#BSVDateRequired').hide();
                    $('#BSVddlTimeRequired').hide();
                    $('#BSVPhoneNoRequired').hide();
                }
            },
            error: function() {
                alert('Opps ! Something went wrong.');
            }
        });
    }
}

function OnChangeEmailValidateBSV(mail) {
    if (!ValidateEmail(mail.value)) {
        $('#BSVEmailVal').show();
        $('#BSVEmailRequired').hide();
    } else {
        $('#BSVEmailVal').hide();
    }
}

function ClearValuesBSV() {
    $('#txtBSVName').val('');
    $('#txtBSVEmail').val('');
    $('#txtBSVDate').val('');
    $('#ddlBSVTime').val('');
    $('#txtBSVPhoneNo').val('');
}

//Download Brochure Form
function LoadDownloadBrochureModalWindow(obj, Project) {
    $.post('Projects/DownloadBrochure', {
        "Project": Project
    }, function(response) {
        $("#DownloadBrochureWrapper").html(response);
        $("#DownloadBrochure").modal('show');
    });
}

function DownloadBrochure(event) {
    event.preventDefault();
    var isValid = true;
    if ($('#txtDWBName').val() == '') {
        isValid = false;
        $('#DWBNameRequired').show();
    } else {
        $('#DWBNameRequired').hide();
    }

    if ($('#txtDWBEmail').val() == '') {
        isValid = false;
        $('#DWBEmailRequired').show();
        $('#DWBEmailVal').hide()
    } else {
        var IsEmailValid = ValidateEmail($('#txtDWBEmail').val());
        if (!IsEmailValid) {
            isValid = false;
            $('#DWBEmailVal').show();
        } else {
            $('#DWBEmailRequired').hide();
            $('#DWBEmailVal').hide()
        }
    }

    if ($('#txtDWBPhoneNo').val() == '') {
        isValid = false;
        $('#DWBPhoneNoRequired').show();
    } else {
        $('#DWBPhoneNoRequired').hide();
    }

    if (isValid) {
        var DWBName = $('#txtDWBName').val();
        var DWBEmail = $('#txtDWBEmail').val();
        var DWBPhoneNo = $('#txtDWBPhoneNo').val();
        $.ajax({
            type: 'POST',
            data: "{'txtDWBName':'" + DWBName + "', 'txtDWBEmail':'" + DWBEmail + "', 'txtDWBPhoneNo':'" + DWBPhoneNo + "', 'Project':'" + $('#Project').val() + "'}",
            url: "Projects/SubmitDownloadBrochure",
            contentType: 'application/json; charset=utf-8',
            dataType: 'html',
            async: false,
            success: function(result) {
                if (result == "Success") {
                    $("#lblMessageDWB").html("Thank you for your interest.<br/>Your message has been successfully received.")
                    $("#msgDisplayDWB").show();
                    ClearValuesDWB();
                    $('#DWBNameRequired').hide();
                    $('#DWBEmailRequired').hide();
                    $('#DWBPhoneNoRequired').hide();
                }
            },
            error: function() {
                alert('Opps ! Something went wrong.');
            }
        });
    }
}

function OnChangeEmailValidateDWB(mail) {
    if (!ValidateEmail(mail.value)) {
        $('#DWBEmailVal').show();
        $('#DWBEmailRequired').hide();
    } else {
        $('#DWBEmailVal').hide();
    }
}

function ClearValuesDWB() {
    $('#txtDWBName').val('');
    $('#txtDWBPhoneNo').val('');
    $('#txtDWBEmail').val('');
    $('#txtDWBSECEmail').val('');
}

//Project Page Request Pricing Form
function LoadRequestPriceModalWindow(obj, Project, Flat) {
    $.post('Projects/RequestPrice', {
        "Project": Project,
        "Flat": Flat
    }, function(response) {
        $("#RequestPriceWrapper").html(response);
        $("#RequestPrice").modal('show');
    });
}

function RequestPrice(event) {
    event.preventDefault();
    var isValid = true;
    if ($('#txtRPName').val() == '') {
        isValid = false;
        $('#NameRequired').show();
    } else {
        $('#NameRequired').hide();
    }
    if ($('#txtRPEmail').val() != '') {
        var IsEmailValid = ValidateEmail($('#txtRPEmail').val());
        if (!IsEmailValid) {
            isValid = false;
            $('#RPEmailVal').show();
        }
    } else {
        $('#RPEmailVal').hide();
    }

    if ($('#txtRPPhoneNo').val() == '') {
        isValid = false;
        $('#PhoneNoRequired').show();
    } else {
        $('#PhoneNoRequired').hide();
    }

    if (isValid) {
        var Name = $('#txtRPName').val();
        var Email = $('#txtRPEmail').val();
        var Phone = $('#txtRPPhoneNo').val();
        $.ajax({
            type: 'POST',
            data: "{'txtRPName':'" + Name + "', 'txtRPEmail':'" + Email + "', 'txtRPPhoneNo':'" + Phone + "', 'Project':'" + $('#Project').val() + "', 'Flat':'" + $('#Flat').val() + "'}",
            url: "Projects/SubmitRequestPrice",
            contentType: 'application/json; charset=utf-8',
            dataType: 'html',
            async: false,
            success: function(result) {
                if (result == "Success") {
                    $("#lblMessageRQP").html("Thank you for your interest.<br/>Your message has been successfully received.")
                    $("#msgDisplayRQP").show();
                    ClearValuesRQP();
                    $('#NameRequired').hide();
                    $('#RPEmailVal').hide();
                    $('#PhoneNoRequired').hide();
                }
            },
            error: function() {
                alert('Opps ! Something went wrong.');
            }
        });
    }
}

function OnChangeEmailValidateRP(mail) {
    if (!ValidateEmail(mail.value)) {
        $('#RPEmailVal').show();
    } else {
        $('#RPEmailVal').hide();
    }
}

function ClearValuesRQP() {
    $('#txtRPName').val('');
    $('#txtRPPhoneNo').val('');
    $('#txtRPEmail').val('');
    $('#txtRPSECEmail').val('');
}

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
}

//Request A Call Back Form
var Message = $('#divMessage');
var onSuccess = function(data) {
    Message.html('<div class="alert alert-success">' +
        '<button data-dismiss="alert" class="close" type="button">' +
        '<i class="ace-icon fa fa-times"></i>' +
        '</button>' + data.Msg +
        '</div>');
    ClearValuesRCB();
}
var onFailure = function(context) {
    Message.html('<div class="alert alert-danger">' +
        '<button data-dismiss="alert" class="close" type="button">' +
        '<i class="ace-icon fa fa-times"></i>' +
        '</button>' + context.status + ' ' + context.statusText +
        '</div>');
    ClearValuesRCB();
}

function NumberOnly(e) //Number Only
{
    var k;
    document.all ? k = e.keyCode : k = e.which;
    return ((k > 47 && k < 58) || k == 8 || k == 0);
}

function ClearValuesRCB() {
    $('#txtRCName').val('');
    $('#txtRCPhoneNo').val('');
    $('#txtRCEmail').val('');
    $('#txtRCSECEmail').val('');
}

$(function() {
    $(".datepicker").datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
        startDate: new Date(),
    });
});

function bindDirector() {

    var director = [];

    director.push({
        SrNo: '1',
        D_Pic: 'sudeep.png',
        D_Name: 'Mr. Sudeep Saha',
        Designation: '<span>Chairman and Managing Director</span>',
        Description: '<div class="text-justify"><p>Mr. Sudeep Saha, CFA is the founder promoter of Avant Group. Prior to founding Avant Group in 2010, Sudeep had around 8 years of experience as a successful Investment and Private Equity professional. Previously Sudeep was Vice President – Investments for India Property Fund (a US$ 315 MM Offshore Real Estate Fund managed by Vornado Realty Trust, USA and The Chatterjee Group). </p><p>He led transactions across Real Estate, Private Equity and Banking, including one of the largest commercial Real Estate projects in Mumbai (FIFC at BKC, Mumbai with a market Value of US$ 500 MM). At TCG, Mr. Saha gained experience in planning and execution of Residential, Commercial and SEZ projects. He was a key member in real estate projects with combined valuation exceeding US$ 1 billion. He was also involved in proposed IPO of a TCG real estate company with valuation in excess of US$ 600 million.He has worked in large MNCs & conglomerates at pivotal positions and handling crucial roles. His experiences during his work career inculcated strong work ethics & process orientation.  </p><p>An amalgamation of his work experience in the real estate industry, close understanding of the ground realities in the sector and an opportunity to serve the underserved market of affordable and good quality housing for the aspirational middle class, inspired him to kick-start the Avant group. It has been over a decade that he has worked in the real estate industry and whenever quizzed about the murkiness of the industry, he always emphasizes that every man has to live by their own values, and his highest value is that of honest commitment in all the homes he builds for people. In addition to his current role as CEO of Avant Group, Sudeep also heads its strategy and new acquisition functions within the Group.Sudeep holds a Bachelor’s degree in Marine Engineering from MERI, Kolkata and has an MBA from Indian Institute of Management, Ahmedabad. Sudeep is also a CFA charter holder from the CFA Institute, USA.</p></div>'
    });

    director.push({
        SrNo: '2',
        D_Pic: 'uddham.png',
        D_Name: 'Udham Singh Jakhar',
        Designation: '<span>Director</span>',
        Description: '<div class="text-justify"><p>Udham is a qualified marine engineers and has worked in various capacities across the globe in marine transportation and oil & gas industry. He has practical hands-on working knowledge of installation , commissioning, running and maintenance of machineries and plants of large capacities. He has experience of over 20 years, operating internationally in a multi-cultural work environment. He has used his engineering and people management skills to promote and run successful facility management company across North India bringing international standards and increased efficiency to the industry. At Avant Group, Udham Singh is part of the core strategy & planning team. He is also in charge of conceptualizing and setting up luxury & hospitality vertical.</p></div>'
    });

    director.push({
        SrNo: '3',
        D_Pic: 'tm.png',
        D_Name: 'Harsh R Shah',
        Designation: '',
        Description: '<div class="text-justify"><p>Mr. Shah is a commerce graduate from Sydenham College. During 80’s Mr. Shah ran multiple businesses such as bulk drugs formulations, electronics and leather. Since 1990, he became a developer and has many large projects to his credit. He is credited with very sharp business acumen and he renowned for finding solutions in impossible situations.</p></div>'
    });

    director.push({
        SrNo: '4',
        D_Pic: 'Anil.png',
        D_Name: 'Anil Shinde',
        Designation: '<span>Chief Operating Officer</span>',
        Description: '<div class="text-justify"><p>A Pioneer and seasoned entrepreneur in business across Industries and also social sphere, having over 40 years of experience both in the Indian hinterland as well as International Markets. His father Late Shri Annasaheb Shinde, a visionary and pioneer of food security of India, has passed on legacy understanding of the Indian agricultural and social scenario of farmers in particular and India in general to Anil Shinde. He has high experience in Real Estate being the Executive Director of Lok Housing And Constructions Ltd. since 2007. He was owner of Octopussy Exports Ltd involved in exporting electronic toys from India. It was awarded with “Top Toy Exporter Award” for three successive Years.</p></div>'
    });

    director.push({
        SrNo: '5',
        D_Pic: 'ashutosh_kane.png',
        D_Name: 'Ashutosh Kane',
        Designation: '<span>Architect</span>',
        Description: '<div class="text-justify"><p>Ashutosh is an architect by training and has previously held senior Design & Development roles with Tata Housing, Omkar Developers, India Property Fund, The Chatterjee Group (TCG), Arogya Bharti Health Parks, Khubchandani Group etc. Apart from this, he has practiced as an architect with Gherzi Eastern Limited. He has over 17+ years of experience in this field and has been with Avant Group since inception. Ashutosh holds a PG Diploma in Advanced Construction Management from NICMAR, Pune and a B. Arch from Bharati Vidyapeeth, Mumbai.</p></div>'
    });

    director.push({
        SrNo: '6',
        D_Pic: 'tm.png',
        D_Name: 'Gopi Gupta',
        Designation: '<span>SVP – Finance & Accounts</span>',
        Description: '<div class="text-justify"><p>A Commerce Graduate and Chartered Accountant having 32 years of domain experience in fund raising – export finance, pre-shipment and post-shipment, External Commercial Borrowings, Term Loans, Equipment Finance, fund and non- fund with Bank, SFCs and All-India Financial Institutions. Have strong experience in revival and restructuring of Sick and Industrial Companies under BIFR and AAIFR liaison with compliance with operating agencies appointed under BIFR.</p></div>'
    });

    director.push({
        SrNo: '7',
        D_Pic: 'tm.png',
        D_Name: 'Manoj Nirmal',
        Designation: '<span>VP, Liasoning Management</span>',
        Description: '<div class="text-justify"><p>Manoj has 12+ years of corporate experience and has previously held roles with American Express, Standard Chartered Finance, Shah Group (Navi Mumbai based Real Estate firm), Laxmi Developers, etc. Manoj has been with Avant Group since early 2013 and handles liasoning for the Group. Manoj holds a B.Com from Mumbai University.</p></div>'
    });


    return director;
}

//modal for Directors
function getContentModal(val) {
    var arrDirector = bindDirector();
    for (var i = 0; i < arrDirector.length; i++) {
        if (arrDirector[i].SrNo === val) {
            var mTitle = '<div class="d-flex align-items-center"><span class="d-pic" style="background-image:url(images/about-us/management/' + arrDirector[i].D_Pic + ')"></span> <span class="info">' + arrDirector[i].D_Name + arrDirector[i].Designation + '</span></div>';
            $('#mmanagement .modal-title').html(mTitle);
            $('#mmanagement .modal-body').html(arrDirector[i].Description);
            $('#mmanagement').modal('show');
            break;
        }
    }
}

/*Map*/
var mapcenter = new google.maps.LatLng(19.169528, 72.865522);

function initialize() {
    map = new google.maps.Map(document.getElementById('map_canvas'), {
        center: mapcenter,
        scrollwheel: false,
        zoom: 12
    });

    var bounds = new google.maps.LatLngBounds();
    infoWindowsArray = [];

    marker0 = new google.maps.Marker({
        position: new google.maps.LatLng(19.138589, 72.858548),
        map: map,
        icon: '/images/completed-projects-marker.png'
    });

    bounds.extend(marker0.position); //Get all the position for centering MAP

    var contentString0 = "<div class='map-outerWrap'><div class='map-headerDataSet' align='left'><span class='greFont'>Jogeshwari (East), Mumbai,</span> Maharashtra </div><div class='map-dataWrap'><span style='font-size:16px;line-height:22px;font-weight:bold;'>Avant Heritage I</span></div></div>";


    infowindow0 = new google.maps.InfoWindow({
        content: contentString0
    });

    infoWindowsArray.push(infowindow0);


    google.maps.event.addListener(marker0, 'click', function() {
        closeAllInfoWindows();
        infowindow0.open(map, marker0);
    });

    marker1 = new google.maps.Marker({
        position: new google.maps.LatLng(19.138589, 72.858548),
        map: map,
        icon: '/images/ongoing-projects-marker.png'
    });

    bounds.extend(marker1.position); //Get all the position for centering MAP


    var contentString1 = "<div class='map-outerWrap'><div class='map-headerDataSet' align='left'><span class='greFont'>Jogeshwari (East), Mumbai,</span> Maharashtra </div><div class='map-dataWrap'><span style='font-size:16px;line-height:22px;font-weight:bold;'>Avant Heritage II</span></div></div>";


    infowindow1 = new google.maps.InfoWindow({
        content: contentString1
    });

    infoWindowsArray.push(infowindow1);


    google.maps.event.addListener(marker1, 'click', function() {
        closeAllInfoWindows();
        infowindow1.open(map, marker1);
    });

    marker2 = new google.maps.Marker({
        position: new google.maps.LatLng(19.138589, 72.858548),
        map: map,
        icon: '/images/ongoing-projects-marker.png'
    });

    bounds.extend(marker2.position); //Get all the position for centering MAP


    var contentString2 = "<div class='map-outerWrap'><div class='map-headerDataSet' align='left'><span class='greFont'>Jogeshwari (East), Mumbai,</span> Maharashtra </div><div class='map-dataWrap'><span style='font-size:16px;line-height:22px;font-weight:bold;'>Avant Heritage III</span></div></div>";


    infowindow2 = new google.maps.InfoWindow({
        content: contentString2
    });

    infoWindowsArray.push(infowindow2);


    google.maps.event.addListener(marker2, 'click', function() {
        closeAllInfoWindows();
        infowindow2.open(map, marker2);
    });

    marker3 = new google.maps.Marker({
        position: new google.maps.LatLng(19.176151, 72.871250),
        map: map,
        icon: '/images/ongoing-projects-marker.png'
    });

    bounds.extend(marker3.position); //Get all the position for centering MAP


    var contentString3 = "<div class='map-outerWrap'><div class='map-headerDataSet' align='left'><span class='greFont'>Goregaon (East), Mumbai,</span> Maharashtra </div><div class='map-dataWrap'><span style='font-size:16px;line-height:22px;font-weight:bold;'>Avant Hillway *</span></div></div>";


    infowindow3 = new google.maps.InfoWindow({
        content: contentString3
    });

    infoWindowsArray.push(infowindow3);


    google.maps.event.addListener(marker3, 'click', function() {
        closeAllInfoWindows();
        infowindow3.open(map, marker3);
    });

    marker4 = new google.maps.Marker({
        position: new google.maps.LatLng(19.176145, 72.857761),
        map: map,
        icon: '/images/ongoing-projects-marker.png'
    });

    bounds.extend(marker4.position); //Get all the position for centering MAP

    var contentString4 = "<div class='map-outerWrap'><div class='map-headerDataSet' align='left'><span class='greFont'>Goregaon (East), Mumbai,</span> Maharashtra </div><div class='map-dataWrap'><span style='font-size:16px;line-height:22px;font-weight:bold;'>Western Woods</span></div></div>";


    infowindow4 = new google.maps.InfoWindow({
        content: contentString4
    });

    infoWindowsArray.push(infowindow4);


    google.maps.event.addListener(marker4, 'click', function() {
        closeAllInfoWindows();
        infowindow4.open(map, marker4);
    });

    marker5 = new google.maps.Marker({
        position: new google.maps.LatLng(18.4716466, 73.8198033),
        map: map,
        icon: '/images/ongoing-projects-marker.png'
    });

    bounds.extend(marker5.position); //Get all the position for centering MAP

    var contentString5 = "<div class='map-outerWrap'><div class='map-headerDataSet' align='left'><span class='greFont'>Pune,</span> Maharashtra </div><div class='map-dataWrap'><span style='font-size:16px;line-height:22px;font-weight:bold;'>Avant Land of Heaven, Pawna</span></div></div>";


    infowindow5 = new google.maps.InfoWindow({
        content: contentString5
    });

    infoWindowsArray.push(infowindow5);


    google.maps.event.addListener(marker5, 'click', function() {
        closeAllInfoWindows();
        infowindow5.open(map, marker5);
    });

    marker6 = new google.maps.Marker({
        position: new google.maps.LatLng(19.136846, 72.858756),
        map: map,
        icon: '/images/completed-projects-marker.png'
    });

    bounds.extend(marker6.position); //Get all the position for centering MAP

    var contentString6 = "<div class='map-outerWrap'><div class='map-headerDataSet' align='left'><span class='greFont'>Jogeshwari (East), Mumbai</span> Maharashtra </div><div class='map-dataWrap'><span style='font-size:16px;line-height:22px;font-weight:bold;'>Avant Heera</span></div></div>";

    infowindow6 = new google.maps.InfoWindow({
        content: contentString6
    });

    infoWindowsArray.push(infowindow6);

    google.maps.event.addListener(marker6, 'click', function() {
        closeAllInfoWindows();
        infowindow6.open(map, marker6);
    });

    //map.fitBounds(bounds);

    //set level of zoom to current zoom level - 1
    var listener = google.maps.event.addListener(map, "idle", function() {
        //map.setZoom(map.getZoom()-1);
        google.maps.event.removeListener(listener);
    });
}

function closeAllInfoWindows() {
    for (var i = 0; i < infoWindowsArray.length; i++) {
        infoWindowsArray[i].close();
    }
}

jQuery(document).ready(function($) {

    initialize();
    jQuery(".proj-list").click(function() {
        closeAllInfoWindows();
        var box_id = $(this).attr('rel');
        eval("infowindow" + box_id).open(map, eval("marker" + box_id));
    });
});

function RedirectToPage(pgName) {
    window.location.href = pgName;
}