new WOW().init();

// scroll-to-element
const scroll = (btnId) => {
    const btnScroll = document.getElementById(btnId);

    const scrollFrom = (elem) => {
        const href = elem.getAttribute("href"),
            block = document.querySelector(href);

        block.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    btnScroll.addEventListener('click', (e) => {
        e.preventDefault();

        scrollFrom(btnScroll);
    });
};
scroll('laboratory-link');
scroll('laboratory-btn');
scroll('gallery-link');
scroll('form-link');

// nav-link-active
const activatedLink = () => {
    const nav = document.getElementById('nav');
    if (!nav) return;

    const links = nav.querySelectorAll('.header__nav-link');

    nav.addEventListener('click', (e) => {
        const target = e.target.closest('.header__nav-link');

        if (target) {
            links.forEach((link, i) => {
                if (link === target) {
                    links[i].classList.add('header__nav-link--active');
                } else {
                    links[i].classList.remove('header__nav-link--active')
                }
            });
        }
    });
};
activatedLink();

// default-inputs-style
const defaultInputs = (formWrapperId) => {
    const form = document.getElementById(formWrapperId);
    if (!form) return;

    const inputs = form.querySelectorAll('.form__controls-item > input');

    inputs.forEach((input) => {
        input.addEventListener('input', () => {
            input.classList.remove('input--error');
        });
    });
};
defaultInputs('form-controls');

// disabled-form-controls
const disabledControls = (formWrapperId) => {
    const form = document.getElementById(formWrapperId);
    if (!form) return;

    const inputs = form.querySelectorAll('.form__controls-item > input');
    const button = form.querySelector('.form__btn');

    inputs.forEach(input => input.disabled = true);
    button.disabled = true;
};

// active-form-controls
const activeControls = (formWrapperId) => {
    const form = document.getElementById(formWrapperId);
    if (!form) return;

    const inputs = form.querySelectorAll('.form__controls-item > input');
    const button = form.querySelector('.form__btn');

    form.reset();
    inputs.forEach(input => input.disabled = false);
    button.disabled = false;
};

// validation-inputs
const validation = (formWrapperId) => {
    const form = document.getElementById(formWrapperId);
    if (!form) return;

    const userSecondName = form.querySelector('[name="second-name"]');
    const userFirstName = form.querySelector('[name="first-name"]');
    const userSurname = form.querySelector('[name="surname"]');

    let success = true;

    if (userSecondName.value.length < 5 || userSecondName.value === "") {
        userSecondName.classList.add('input--error');
        success = false;
    };

    if (userFirstName.value.length < 2 || userFirstName.value === "") {
        userFirstName.classList.add('input--error');
        success = false;
    };

    if (userSurname.value.length < 4 || userSurname.value === "") {
        userSurname.classList.add('input--error');
        success = false;
    };

    return success;
};

// active-popup
const activePopup = () => {
    const overlay = document.getElementById('overlay');
    if (!overlay) return;

    overlay.classList.add('overlay--show');
};

const deactivationPopup = () => {
    const overlay = document.getElementById('overlay');
    if (!overlay) return;

    overlay.classList.remove('overlay--show');
};

const activatedPopup = () => {
    const overlay = document.getElementById('overlay');
    if (!overlay) return;

    overlay.addEventListener('click', () => {
        deactivationPopup()
    });
};
activatedPopup();

// send form
const sendForm = (formWrapperId) => {
    const form = document.getElementById(formWrapperId);
    if (!form) return;

    const formBtnText = form.querySelector('.form__btn > span');

    defaultInputs('form-controls');
    activeControls('form-controls');

    const sendData = async (data) => {
        return fetch('../php/send.php', {
            method: 'POST',
            body: data,
        }).then(res => res.json());
    };

    const defaultControls = () => {
        disabledControls('form-controls');
        formBtnText.textContent = 'Ошибка!';

        setTimeout(() => {
            activeControls('form-controls');
            defaultInputs('form-controls');
            formBtnText.textContent = 'Отправить';
        }, 3000);
    };

    const submitForm = () => {
        const formData = new FormData(form);

        disabledControls('form-controls');

        if (validation(formWrapperId)) {
            //имитация отправки
            formBtnText.textContent = 'Отправка...';

            setTimeout(() => {
                disabledControls('form-controls');
                formBtnText.textContent = 'Отправлено!';
                activeControls('form-controls');
                activePopup();
            }, 2000);

            setTimeout(() => {
                deactivationPopup();
            }, 5000);

            //sending-form
            // formBtnText.textContent = 'Отправка...';

            // sendData(formData)
            //     .then((data) => {
            //         disabledControls('form-controls');
            //         formBtnText.textContent = 'Отправлено!';
            //     })
            //     .catch((error) => {
            //         defaultControls();
            //     });
        } else {
            defaultControls();
        };
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        submitForm();
    });
};
sendForm('form-controls');