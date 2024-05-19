export const scrollMainToTop = () => {
  const main = document.getElementById('main-content');
  if (main) {
    main.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
