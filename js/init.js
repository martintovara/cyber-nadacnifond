document.addEventListener('DOMContentLoaded', () => {
    const observer = new MutationObserver((_mutations, observerIn) => {
        const main = document.getElementsByClassName('banner-div')[0];
        if (main) {
            setMarginMain();
            observerIn.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    addCarouselGalleryImgs();
    themeBasedOnUser();
});
