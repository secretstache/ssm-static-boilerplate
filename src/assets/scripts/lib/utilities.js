/* Replace all SVG images with inline SVG */
export function editableSvg(el) {
    $(el).each(function () {
        let $img = $(this);
        const imgID = $img.attr("id");
        const imgClass = $img.attr("class");
        const imgURL = $img.attr("src");
        $.get(
            imgURL,
            function (data) {
                // Get the SVG tag, ignore the rest
                let $svg = $(data).find("svg");
                // Add replaced image's ID to the new SVG
                if (typeof imgID !== "undefined") {
                    $svg = $svg.attr("id", imgID);
                }
                // Add replaced image's classes to the new SVG
                if (typeof imgClass !== "undefined") {
                    $svg = $svg.attr("class", imgClass + " replaced-svg");
                }
                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr("xmlns:a");
                // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
                if (
                    !$svg.attr("viewBox") &&
                    $svg.attr("height") &&
                    $svg.attr("width")
                ) {
                    $svg.attr(
                        "viewBox",
                        "0 0 " + $svg.attr("width") + " " + $svg.attr("height")
                    );
                }
                // Replace image with new SVG
                $img.replaceWith($svg);
            },
            "xml"
        );
    });
}

export function isInViewport(el) {
    let elementTop = el.offset().top;
    let elementBottom = elementTop + el.outerHeight();

    let viewportTop = $(window).scrollTop();
    let viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
}

export function hideHeaderOnScroll() {
    let didScroll;
    let lastScrollTop = 0;
    let delta = 150;
    let navbarHeight = $(".site-header").outerHeight();

    $(window).on("scroll", function (event) {
        didScroll = true;
    });

    function hasScrolled() {
        let st = $(document).scrollTop();
        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta) {
            return;
        }
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight + 500) {
            // Scroll Down
            $(".site-header").removeClass("nav-down").addClass("nav-up");
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $(".site-header").removeClass("nav-up").addClass("nav-down");
            }
        }
        lastScrollTop = st;
    }
    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);
}

export function tooltip() {
    const tooltips = document.querySelectorAll(".tooltip");

    tooltips.forEach((tooltip) => {
        const tooltipTrigger = tooltip.querySelector(".tooltip-trigger"),
            tooltipContent = tooltip.querySelector(".tooltip-content"),
            tooltipPositionClasses = tooltipContent.classList,
            arrClasses = [...tooltipPositionClasses],
            positionClasses = ["top", "right", "bottom", "left"];

        const matched = positionClasses.filter(
            (el) => arrClasses.indexOf(el) > -1
        );

        if (!matched.length) {
            setTooltipPosition();
        }

        function setTooltipPosition() {
            positionClasses.forEach(function (item) {
                tooltipContent.classList.remove(item);
            });

            const tooltipSpace = tooltipTrigger.getBoundingClientRect();
            const tooltipBox = tooltipContent.getBoundingClientRect();
            const tooltipRight = tooltipBox.right + tooltipBox.width;

            if (
                tooltipSpace.top > tooltipBox.height &&
                tooltipBox.left > 0 &&
                tooltipRight < window.innerWidth
            ) {
                tooltipContent.classList.add("top");
            } else if (
                tooltipSpace.bottom > tooltipBox.height &&
                tooltipBox.left > 0 &&
                tooltipRight < window.innerWidth
            ) {
                tooltipContent.classList.add("bottom");
            } else {
                if (tooltipBox.left > 0 && tooltipRight > window.innerWidth) {
                    tooltipContent.classList.add("left");
                } else if (
                    tooltipBox.left < 0 &&
                    tooltipRight < window.innerWidth
                ) {
                    tooltipContent.classList.add("right");
                } else {
                    tooltipContent.classList.add("bottom");
                }
            }
        }

        window.addEventListener("resize", throttle(setTooltipPosition, 200));

        let mouseOverTooltip = false,
            mouseOverTooltipButton = false;

        tooltipTrigger.addEventListener("mouseover", function () {
            mouseOverTooltipButton = true;
            showTooltipContent();
        });

        tooltipTrigger.addEventListener("mouseout", function () {
            mouseOverTooltipButton = false;

            setTimeout(function () {
                if (!mouseOverTooltip) {
                    hideTooltipContent();
                }
            }, 200);
        });

        tooltipContent.addEventListener("mouseenter", function () {
            mouseOverTooltip = true;
        });

        tooltipContent.addEventListener("mouseleave", function () {
            mouseOverTooltip = false;

            setTimeout(function () {
                if (!mouseOverTooltipButton) {
                    hideTooltipContent();
                }
            }, 200);
        });

        function showTooltipContent() {
            tooltipContent.classList.add("active");
        }

        function hideTooltipContent() {
            tooltipContent.classList.remove("active");
        }
    });
}

export function throttle(f, t) {
    return function (args) {
        let previousCall = this.lastCall;
        this.lastCall = Date.now();

        if (previousCall === undefined || this.lastCall - previousCall > t) {
            f(args);
        }
    };
}
