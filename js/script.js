let current = '#home';
const pathGallery = './img/gallery/';
const pathArticle = './img/gallery/';

function setMarginMain() {
    const main = document.getElementsByClassName('banner-div')[0];
    const clientHeight = main.clientHeight;

    document.getElementsByClassName('main')[0].style.margin = clientHeight + 'px auto 0 auto';
}

function copyEmail() {
    const email = document.getElementById('email').innerHTML;
    navigator.clipboard.writeText(email);
    makeToastWithMailto('Email byl zkopírován do schránky', 5000, email);
}

function menuHighlight() {
    const menu = 'menu-item-active';
    const pages = ['home', 'club', 'news', 'gallery', 'contact'];
    for (const element of pages) {
        if (partInViewport(element) && getViewPercentage(element) > 49) {
            const active = document.getElementsByClassName(menu);
            if (active[0]) {
                active[0].classList.remove(menu);
            }

            current = 'index#' + element;

            document.getElementById('nav-' + element).classList.add(menu);
        }
    }
}

function partInViewport(id) {
    if (!id) {
        return;
    }

    const elem = document.getElementById(id);
    const x = elem.getBoundingClientRect().left;
    const y = elem.getBoundingClientRect().top;
    const ww = Math.max(document.documentElement.clientWidth, window.innerWidth);
    const hw = Math.max(document.documentElement.clientHeight, window.innerHeight);
    const w = elem.clientWidth;
    const h = elem.clientHeight;

    return y < hw && y + h > 0 && x < ww && x + w > 0;
}

function getViewPercentage(id) {
    const element = document.getElementById(id);

    const viewport = {
        top: window.pageYOffset,
        bottom: window.pageYOffset + window.innerHeight,
    };

    const elementBoundingRect = element.getBoundingClientRect();
    const elementPos = {
        top: elementBoundingRect.y + window.pageYOffset,
        bottom: elementBoundingRect.y + elementBoundingRect.height + window.pageYOffset,
    };

    if (viewport.top > elementPos.bottom || viewport.bottom < elementPos.top) {
        return 0;
    }

    // Element is fully within viewport
    if (viewport.top < elementPos.top && viewport.bottom > elementPos.bottom) {
        return 100;
    }

    // Element is bigger than the viewport
    if (elementPos.top < viewport.top && elementPos.bottom > viewport.bottom) {
        return 100;
    }

    const elementHeight = elementBoundingRect.height;
    let elementHeightInView = elementHeight;

    if (elementPos.top < viewport.top) {
        elementHeightInView = elementHeight - (window.pageYOffset - elementPos.top);
    }

    if (elementPos.bottom > viewport.bottom) {
        elementHeightInView = elementHeightInView - (elementPos.bottom - viewport.bottom);
    }

    const percentageInView = (elementHeightInView / window.innerHeight) * 100;

    return Math.round(percentageInView);
}

function shuffleArray(array) {
    const result = array.slice();
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

function addCarouselGalleryImgs() {
    let aux = 0;

    const inner = document.querySelector('.carousel-inner-gallery');
    let setFirst = false;

    const arrImgs = shuffleArray(galleryImgs);

    for (const arrImg of arrImgs) {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.setAttribute('data-bs-interval', '5000');

        const img = document.createElement('img');
        img.src = pathGallery + arrImg;
        img.alt = 'galleryImage-' + arrImg;

        item.appendChild(img);
        inner.appendChild(item);

        //Indicators
        const parentElement = document.querySelector('.carousel-indicators-gallery');
        const button1 = document.createElement('button');
        button1.type = 'button';
        button1.setAttribute('data-bs-target', '#carouselGallery');
        button1.setAttribute('data-bs-slide-to', aux.toString());
        button1.setAttribute('aria-current', 'true');
        button1.setAttribute('aria-label', 'Slide ' + aux);

        if (!setFirst) {
            item.className = 'carousel-item active';
            button1.classList.add('active');
            setFirst = true;
        }

        parentElement.appendChild(button1);
        aux++;
    }
}

function switchMode() {
    const themeIcon = document.getElementById('theme-icon');

    if (themeIcon.classList.contains('fa-sun')) {
        //Switch to dark mode
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');

        document.getElementById('cssMode').href = 'css/dark.css';
    } else {
        //Switch to light mode
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');

        document.getElementById('cssMode').href = 'css/light.css';
    }
}

function detectOSTheme() {
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function themeBasedOnUser() {
    if (detectOSTheme() === 'dark') {
        themeIcon = document.getElementById('theme-icon');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        document.getElementById('cssMode').href = 'css/dark.css';
    }
}

function createArticle(headerText, articleText, articleImgs, aux) {
    // Create the main container div
    const article = document.createElement('div');
    article.classList.add('article', 'container-fluid', 'shadow', 'mb-5');

    // Create the header section
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('d-flex', 'justify-content-center', 'p-3');
    const header = document.createElement('h3');
    header.innerHTML = headerText;
    header.classList.add('article-header');
    headerContainer.appendChild(header);

    // Create the content section
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('p-2', 'container-fluid', 'justify-content-center', 'article-content');

    const row = document.createElement('div');
    row.classList.add('row');

    // First column
    const col = document.createElement('div');
    col.classList.add('col-12', 'col-lg-6', 'article-text', 'text-center', 'align-self-center', 'text-center');
    createCarousel(col, aux);
    row.appendChild(col);

    // Middle column
    const colMiddle = document.createElement('div');
    colMiddle.classList.add('col-auto', 'text-center', 'article-divider', 'article-middle');
    colMiddle.style.marginRight = '2.5%';
    colMiddle.style.marginLeft = '1.5%';
    row.appendChild(colMiddle);

    // Second column
    const col2 = document.createElement('div');
    col2.classList.add('col-12', 'col-lg-5', 'article-text', 'text-center', 'align-self-center');
    col2.innerHTML = articleText;
    row.appendChild(col2);

    contentContainer.appendChild(row);
    article.appendChild(headerContainer);
    article.appendChild(contentContainer);

    // Append the article container to the body or another element
    document.getElementById('newsArticles').appendChild(article);

    addCarouselArticleImgs(articleImgs, aux);

    aux++;
}

function addCarouselArticleImgs(arrImgs, aux) {
    let setFirst = false;
    let localAux = 0;
    for (const arrImg of arrImgs) {
        const item = document.createElement('div');
        item.className = 'carousel-item';

        const img = document.createElement('img');
        img.src = pathArticle + arrImg;
        img.alt = 'articleImage-' + arrImg;
        item.appendChild(img);
        document.getElementById('innerCarousel' + aux).appendChild(item);

        //Indicators
        const parentElement = document.querySelector('.carousel-indicators-article' + aux);
        parentElement.classList.add('d-none');
        const button1 = document.createElement('button');
        button1.type = 'button';
        button1.setAttribute('data-bs-target', '#carousel' + aux);
        button1.setAttribute('data-bs-slide-to', localAux.toString());
        button1.setAttribute('aria-current', 'true');
        button1.setAttribute('aria-label', 'Slide ' + localAux);

        if (!setFirst) {
            item.className = 'carousel-item active';
            button1.classList.add('active');
            setFirst = true;
        }
        localAux++;

        parentElement.appendChild(button1);
    }

    document.getElementById('carousel' + aux).onmouseenter = function () {
        const carouselDiv = document.querySelector('.carousel-indicators-article' + aux);
        const buttonCount = carouselDiv.querySelectorAll('button').length;

        document.querySelector('.carousel-indicators-article' + aux).classList.remove('d-none');

        if (buttonCount > 1) {
            document.getElementById('prev-carousel' + aux).classList.remove('d-none');
            document.getElementById('next-carousel' + aux).classList.remove('d-none');
        }
    };

    document.getElementById('carousel' + aux).onmouseleave = function () {
        const carouselDiv = document.querySelector('.carousel-indicators-article' + aux);
        const buttonCount = carouselDiv.querySelectorAll('button').length;

        document.querySelector('.carousel-indicators-article' + aux).classList.add('d-none');

        if (buttonCount > 1) {
            document.getElementById('prev-carousel' + aux).classList.add('d-none');
            document.getElementById('next-carousel' + aux).classList.add('d-none');
        }
    };
}

function createCarousel(col, aux) {
    // Create the main carousel container
    const carousel = document.createElement('div');
    carousel.id = 'carousel' + aux;
    carousel.className = 'carousel slide carousel-fade carousel-full-width';

    carousel.setAttribute('data-toggle', 'tooltip');
    carousel.setAttribute('title', 'Klikněte pro zobrazení v plném rozlišení');
    carousel.setAttribute('data-placement', 'top');

    // Create the indicators container
    const indicators = document.createElement('div');
    indicators.className = 'carousel-indicators carousel-indicators-article' + aux;
    carousel.appendChild(indicators);

    // Create the inner container for carousel items
    const inner = document.createElement('div');
    inner.className = 'text-center carousel-inner carousel' + aux;
    inner.id = 'innerCarousel' + aux;
    inner.style.cursor = 'pointer';
    inner.onclick = function () {
        showFullscreen(inner.id);
    };
    carousel.appendChild(inner);

    // Create the previous button
    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-control-prev d-none';
    prevButton.type = 'button';
    prevButton.setAttribute('data-bs-target', '#carousel' + aux);
    prevButton.setAttribute('id', 'prev-carousel' + aux);
    prevButton.setAttribute('data-bs-slide', 'prev');

    // Create the previous button icon
    const prevIcon = document.createElement('span');
    prevIcon.className = 'carousel-control-prev-icon';
    prevIcon.setAttribute('aria-hidden', 'true');
    prevButton.appendChild(prevIcon);

    // Create the visually hidden text for previous button
    const prevText = document.createElement('span');
    prevText.className = 'visually-hidden';
    prevText.textContent = 'Předchozí';
    prevButton.appendChild(prevText);

    // Create the next button
    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-control-next d-none';
    nextButton.type = 'button';
    nextButton.setAttribute('data-bs-target', '#carousel' + aux);
    nextButton.setAttribute('id', 'next-carousel' + aux);
    nextButton.setAttribute('data-bs-slide', 'next');

    // Create the next button icon
    const nextIcon = document.createElement('span');
    nextIcon.className = 'carousel-control-next-icon';
    nextIcon.setAttribute('aria-hidden', 'true');
    nextButton.appendChild(nextIcon);

    // Create the visually hidden text for next button
    const nextText = document.createElement('span');
    nextText.className = 'visually-hidden';
    nextText.textContent = 'Další';
    nextButton.appendChild(nextText);

    // Append buttons to the carousel
    carousel.appendChild(prevButton);
    carousel.appendChild(nextButton);

    col.appendChild(carousel);
}

function createArticleGallery() {
    if (!dataArticles) {
        return;
    }

    let aux = 0;

    for (const dataArticle of dataArticles) {
        createArticle(dataArticle.header, dataArticle.text, dataArticle.imgs, aux);
        aux++;
    }
}

function showFullscreen(id) {
    const inner = document.getElementById(id);
    const active = inner.querySelector('.active');
    const imgElement = active.querySelector('img');

    const imageSrc = imgElement.src;
    const fullscreenImage = document.getElementById('fullscreenImage');
    fullscreenImage.src = imageSrc;

    const footerButton = document.querySelector('#fullscreenModal .modal-footer button');
    footerButton.textContent = 'Zavřít';
    footerButton.style.width = '30%';
    const fullscreenModal = new bootstrap.Modal(document.getElementById('fullscreenModal'));
    fullscreenModal.show();
}
