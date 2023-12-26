const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'), //Inside el top level element should be kept
    smooth: true
}); 

function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("#navbar", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
        
    })
        .to(".boundingelem", {
            y: '0',
            duration: 1.5,
            ease: Expo.easeInOut,
            delay: -1,
            stagger: .2
        })

        .from("#herofooter", {
            y: '-10',
            opacity: 0,
            duration: 1.5,
            delay: -0.5,
            ease: Expo.easeInOut
            
        })
}
var timeout;

function CircleDesize(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev );
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);
        
        //clamp is taken from gsap clamp(minimum, maximum,valueToClamp )

            xprev = dets.clientX;
            yprev = dets.clientY; 

            circleMouseFollower(xscale, yscale);
            
            timeout = this.setTimeout(function(){
                document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`; 
            }, 100);
            // written inside setTimeout will run after the mentioned time
                       
     });
}

function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}
CircleDesize();
circleMouseFollower();
firstPageAnim();

//Applying querySelectorAll give a node list on which we can apply .foreach
document.querySelectorAll(".elem1").forEach(function (elem1){
    var rotate = 0;
    var diffrt = 0;
  
    elem1.addEventListener("mousemove", function (dets){
        var diff = dets.clientY - elem1.getBoundingClientRect().top;
        diffrt = rotate - dets.clientX ;
        rotate = dets.clientX;
         //Above line gives the diff of the mousepoint from the top
        //getBoundingRect gives elem1 div's details
         gsap.to(elem1.querySelector("img"),{
            opacity: 1,
            ease: "Power1.ease",
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrt)

        });
    }); 
    elem1.addEventListener("mouseleave", function (dets){
        gsap.to(elem1.querySelector("img"),{
           opacity: 0,
           ease: "Power3.ease"
       });
   }); 
}); 

//for each selects one elem1 at a time and selects all 3 elem1
//GSAP library is used to create moving animations