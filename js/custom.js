gsap.registerPlugin(ScrollTrigger)

document.addEventListener("DOMContentLoaded", function () {
    const pinnedSections = gsap.utils.toArray(".card");
    // const lastCard = document.querySelector(".card.scroll");
    const lastCard = pinnedSections.pop();
    // const footer = document.querySelector(".footer");
    const footer = lastCard.nextElementSibling;
    // console.log("card", pinnedSections.pop().nextElementSibling);  
    

    pinnedSections.forEach((section, index, sections) => {

        let img = section.querySelector(".img");


        let nextSection = sections[index + 1] || lastCard;
        let endSectionPoint = `top+=${nextSection.offsetTop - section.offsetTop} top`;
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: index === sections.length ? `+=S{lastCard.offsetHeight / 2}` : footer.offsetTop - window.innerHeight,
                pin: true,
                pinSpacing: false,
                scrub: 1,
                // markers: true,
            }
        });

        gsap.fromTo(img,
            {
                scale: 1
            },
            {
                scale: 0.5,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: endSectionPoint,
                    scrub: 1,
                    // markers: true,
                }
            }
        )
    });

    const heroH1 = document.querySelector(".hero h1");
    ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        // end: "+=400vh",
        end: window.outerHeight / 2,
        scrub: 1,
        // markers: true,
        onUpdate: (self) => {
            let opacityProgress = self.progress;
            heroH1.style.opacity = 1 - opacityProgress;

        }
    });
});

