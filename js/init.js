/** Observer for setting up correct main margin when element appears */
const observer = new MutationObserver((_mutations, observerIn) => {
    const main = document.getElementsByClassName('banner-div')[0];
    if (main) {
        setMarginMain();
        observerIn.disconnect();
    }
});
observer.observe(document.body, { childList: true, subtree: true });

/** DOMContent functions */
document.addEventListener('DOMContentLoaded', () => {
    themeBasedOnUser();
    addCarouselGalleryImgs();
});
