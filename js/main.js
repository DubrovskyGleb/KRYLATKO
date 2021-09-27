//анимация
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 2;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    setTimeout(() => {
        animOnScroll()
    }, 300);
}

//модальные окна
let popupLinks = document.querySelectorAll('.popup-link'),
    body = document.querySelector('body'),
    popupCloseIcon = document.querySelectorAll('.close-popup');

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        let popupLink = popupLinks[index];
        popupLink.addEventListener('click', function (e) {
            let popupName = popupLink.getAttribute('href').replace('#', ''),
                currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
        });
    }
}

if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        let el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        })
    }
}

function popupOpen(currentPopup) {
    currentPopup.classList.add('popup-active');
    bodyLock();
    currentPopup.addEventListener('click', function (e) {
        if (!e.target.closest('.callback__form')) {
            popupClose(e.target.closest('.popup'));
        }
    })
}

function popupClose(popupActive) {
    popupActive.classList.remove('popup-active');
    bodyUnLock();
}

function bodyLock() {
    let lockPaddingValue = window.innerWidth - document.querySelector('.stels').offsetWidth + 'px';
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');
}

function bodyUnLock() {
    setTimeout(function () {
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, 800);
}

// полифилы
(function () {

    // проверяем поддержку
    if (!Element.prototype.closest) {

        // реализуем
        Element.prototype.closest = function (css) {
            var node = this;

            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }

})();

(function () {

    // проверяем поддержку
    if (!Element.prototype.matches) {

        // определяем свойство
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;

    }

})();