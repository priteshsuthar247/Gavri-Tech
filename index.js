var width = $(window).width(); 
window.onscroll = function(){
if ((width >= 1000)){
    if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        $("#header").css("background","#fff");
        $("#header").css("color","#000");
        $("#header").css("box-shadow","0px 0px 20px rgba(0,0,0,0.09)");
        $("#header").css("padding","4vh 4vw");
        $("#navigation a").hover(function(){
            $(this).css("border-bottom","2px solid rgb(44, 143, 255)");
        },function(){
            $(this).css("border-bottom","2px solid transparent");
        });
    }else{
        $("#header").css("background","transparent");
        $("#header").css("color","#fff");
        $("#header").css("box-shadow","0px 0px 0px rgba(0,0,0,0)");
        $("#header").css("padding","6vh 4vw");
        $("#navigation a").hover(function(){
            $(this).css("border-bottom","2px solid #fff");
        },function(){
            $(this).css("border-bottom","2px solid transparent");
        });
    }
}
}

function magnify(imglink){
    $("#img_here").css("background",`url('${imglink}') center center`);
    $("#magnify").css("display","flex");
    $("#magnify").addClass("animated fadeIn");
    setTimeout(function(){
        $("#magnify").removeClass("animated fadeIn");
    },800);
}

function closemagnify(){
    $("#magnify").addClass("animated fadeOut");
    setTimeout(function(){
        $("#magnify").css("display","none");
        $("#magnify").removeClass("animated fadeOut");
        $("#img_here").css("background",`url('') center center`);
    },800);
}

setTimeout(function(){
    $("#loading").addClass("animated fadeOut");
    setTimeout(function(){
      $("#loading").removeClass("animated fadeOut");
      $("#loading").css("display","none");
    },800);
},1650);

$(document).ready(function(){
    $("a").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('body,html').animate({
        scrollTop: $(hash).offset().top
        }, 1800, function(){
        window.location.hash = hash;
       });
       } 
      });
  });
  
const crewMembers = [
  { name: "Site Name", role: "Location" },
  { name: "Site Name", role: "Location" },
  { name: "ABB", role: "Vadodara, Gujarat" },
  { name: "Ginger", role: "Udaipur, Rajasthan" },
  { name: "Jeumont Electric", role: "Jarod, Gujarat" },
  { name: "Lucy", role: "Halol, Gujarat" },
  { name: "RE", role: "Location" },
  { name: "Rishi FIBC", role: "Vadodara, Gujarat" },
  { name: "Shreeji Pesticides", role: "Manjusar, Gujarat" }
];

const crewCards = document.querySelectorAll(".crew-card");
const crewDots = document.querySelectorAll(".crew-dot");
const crewName = document.querySelector(".crew-name");
const crewRole = document.querySelector(".crew-role");
const leftBtn = document.querySelector(".crew-left");
const rightBtn = document.querySelector(".crew-right");

let crewIndex = 0;
let crewAnimating = false;

function updateCrewCarousel(newIndex) {
  if (crewAnimating) return;
  crewAnimating = true;

  crewIndex = (newIndex + crewCards.length) % crewCards.length;

  crewCards.forEach((card, i) => {
    const offset = (i - crewIndex + crewCards.length) % crewCards.length;
    card.classList.remove("center", "left-1", "left-2", "right-1", "right-2", "hidden");

    if (offset === 0) card.classList.add("center");
    else if (offset === 1) card.classList.add("right-1");
    else if (offset === 2) card.classList.add("right-2");
    else if (offset === crewCards.length - 1) card.classList.add("left-1");
    else if (offset === crewCards.length - 2) card.classList.add("left-2");
    else card.classList.add("hidden");
  });

  crewDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === crewIndex);
  });

  crewName.style.opacity = "0";
  crewRole.style.opacity = "0";

  setTimeout(() => {
    crewName.textContent = crewMembers[crewIndex].name;
    crewRole.textContent = crewMembers[crewIndex].role;
    crewName.style.opacity = "1";
    crewRole.style.opacity = "1";
  }, 300);

  setTimeout(() => {
    crewAnimating = false;
  }, 800);
}

leftBtn.addEventListener("click", () => updateCrewCarousel(crewIndex - 1));
rightBtn.addEventListener("click", () => updateCrewCarousel(crewIndex + 1));
crewDots.forEach((dot, i) => dot.addEventListener("click", () => updateCrewCarousel(i)));
crewCards.forEach((card, i) => card.addEventListener("click", () => updateCrewCarousel(i)));

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") updateCrewCarousel(crewIndex - 1);
  else if (e.key === "ArrowRight") updateCrewCarousel(crewIndex + 1);
});

let touchStart = 0;
let touchEnd = 0;

document.addEventListener("touchstart", (e) => {
  touchStart = e.changedTouches[0].screenX;
});
document.addEventListener("touchend", (e) => {
  touchEnd = e.changedTouches[0].screenX;
  const diff = touchStart - touchEnd;
  if (Math.abs(diff) > 50) {
    if (diff > 0) updateCrewCarousel(crewIndex + 1);
    else updateCrewCarousel(crewIndex - 1);
  }
});

updateCrewCarousel(0);