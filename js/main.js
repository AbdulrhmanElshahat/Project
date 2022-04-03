let navBar = $('#nav');
let overLay = $(".overLay");
let navItems = $('#nav .nav-item')
let navLinks = navItems.children('.nav-link')
let activeLink
let slider = $("#slider");
let popup = $('.popup');
let close = $('.close');
let sections = [$(".slider"), $('.vedio') , $('.services') ,$('.donations'), $('.gallary')]
let centerDescription = $('.modal-body p');
let centerTitle = $('.modal-title');
let centerAddress = $('.modal-footer .address span');
let centerPhone = $('.modal-footer .phone-num span');
let centerBankAcount = $('.modal-footer .acount-num span');
let centerSocial = $('.modal-footer .social a');
let modalFooter = $(".modal-footer .contact");
let windowTop;
let sectionsOfsetTop;
let sectionHeight;
// Navbar

navItems.click(function(){
     activeLink =  $(this).children('.nav-link');
    toggleClass(navLinks , 'active' , activeLink);
})
changeNaveStyle(0)
$(window).on("scroll resize" , _=> changeNaveStyle())
sections.forEach(ele => {
    
    $(window).scroll(function(){
        let scrolling = $(window).scrollTop() + 100;
        sectionsOfsetTop = ele.offset().top;
        sectionHeight = ele.outerHeight();
        allHeight = sectionsOfsetTop + sectionHeight;
        if( scrolling >= sectionsOfsetTop && scrolling <= allHeight){
            let visiblePart = sections.filter(e => e.offset().top <= scrolling && (e.outerHeight() + e.offset().top)>= scrolling)
            activeLink =  navItems.children(`[href = "#${$(visiblePart)[0].prop('id')}"]`)
            toggleClass(navLinks , 'active' , activeLink)
        }
    })
})
function changeNaveStyle(){
    if($(this).scrollTop() > 0 || $(this).width() <= 575){ shrink()}else{grow()}
}
function grow(){
    navBar.removeClass("bg-dark")
    navBar.addClass("py-3")
}
function shrink(){
    navBar.addClass("bg-dark")
    navBar.removeClass("py-3")
}
// Gallary

// open photo
$(".gallary .box").click((function(){
    let src = $(this).children('img').prop('src');
    popup.children('.popup-img').children('img').prop('src' , `${src}`);
    if($(window).width() > 767 && $(window).height() >= 600){
    overLay.css('display' , 'block')
    $('body').css('overflow' , 'hidden')
    window.scrollTo(0 , $('.gallary').offset().top - 200)
    popup.show(300)
    }
}))
// close photo
close.click(function(){
    overLay.css('display' , 'none')
    popup.hide(300 , _=>$('body').css('overflow' , 'auto'))
})

$.getJSON('main.json', function(data){
    let info = data,
        centersBtns,
        centersBtnsParent = $('.services .navbar-nav'),
        mainTitle,
        mainAddress,
        mainPhone,
        mainSocial,
        mainBank,
        houseDescription,
        cardDescription,
        cardAmountDescription,
        descriptionsArr;
    // Creat Centers Btns
    for(let prop in info){
        centersBtns = creatNavItem(prop);
        centersBtnsParent.append(centersBtns)
    }
    // Centers Btns
    centersBtns = $(centersBtnsParent.children());    
    let row = $('.services .row');
    window.onload = function(){
        centersBtns.first().click()
    }

    centersBtns.click(function(){
        let curentItemeCase = $(this).hasClass('active');
        if(curentItemeCase === false){
            toggleClass(centersBtns , 'active' , this)
            let housesOfCenter = info[$(this).text()];
            let houseContent;
            descriptionsArr = []
            row.children().remove()
            for(let houseCenter in housesOfCenter){
                houseDescription = housesOfCenter[houseCenter].description;
                descriptionsArr.push(houseDescription)
                cardAmountDescription = houseDescription.split("." , 1);
                cardDescription = cardAmountDescription.join(" ");
                mainTitle = housesOfCenter[houseCenter].title,
                mainAddress = housesOfCenter[houseCenter].contact.address,
                mainPhone = housesOfCenter[houseCenter].contact.phonenum,
                mainSocial = housesOfCenter[houseCenter].contact.facebook,
                mainBank = housesOfCenter[houseCenter].contact.acountnum;
                bankName = housesOfCenter[houseCenter].contact.bankName;
                houseContent = creatCard(mainTitle, cardDescription , mainAddress , mainPhone , mainBank , mainSocial , bankName)
                row.append(houseContent)
            }
            houseContent = $(row.children())
            fadeEle(houseContent)
        }
        let redMore = $('.red-more')
        let redMoreArr = Array.from(redMore)
        redMore.click(function(){
            let card = $(this).parents('.card');
                fillEle(centerTitle ,card.children(".card-header").text())
                fillEle(centerDescription , descriptionsArr[redMoreArr.indexOf(this)])
                fillEle(modalFooter, card.children(".card-footer").html())
        })
    })
    
})

function fillEle(ele , tex){
    ele.html(tex)
}
function getText(parentEle , ele){
   let TheText =  parentEle.find(`${ele}`).text()
   return TheText
}
function toggleClass(ele , className , curentEle){
    ele.removeClass(className)
    $(curentEle).addClass(className)
}

function creatCard(title , description , address , phone , bank , social , bankName){
    return `
    <div class="col-md-6 col-lg-4 mb-4">
    <div class="card">
    <div class="card-header text-center">
        <h5 class="card-title">${title}</h5>
    </div> 

    <div class="card-body">
        <p>
        ${description} <a href="#" data-bs-toggle="modal" data-bs-target="#myModal" class='red-more text-black-50'>اقرء المزيد</a>
        </p>
    </div>

    <div class="card-footer">
        <div class="phone-num pb-2">
        <i class="fa-solid fa-mobile-screen-button"></i> <span class="text-black-50">${phone}</span> 
        </div>
        <div class="acount-num pb-2" title ="${bankName}">
        <i class="fa-solid fa-money-check"></i> <span class="text-black-50 num">${bank}</span> 
        </div>
        <div class="address pb-2">
        <i class="fa-solid fa-location-dot"></i> <span class="text-black-50">${address}</span>
        </div>
        <div class="social ">
        <a href="${social}"><i class="fa-brands fa-facebook"></i></a>
        </div>
    </div>
    </div>
</div>`
}
function creatNavItem(text){
    return `<li class="nav-item rounded mb-3 mb-lg-0 ms-lg-3" data-target="#talkha">${text}</li>`
}
function fadeEle(ele){
    ele.css( "display", 'none')
    ele.fadeIn(500)
}