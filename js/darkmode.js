/*jshint esversion: 6 */

/* dark mode */
document.addEventListener('DOMContentLoaded', () => {

  /* 로컬 스토리지에서 theme 받아오기 */
  let theme = localStorage.getItem('theme');
  /* 값이 없으면 theme, light로 key, value 지정 */
  if(!theme) {
    // localStorage.setItem('theme', 'light');
    const { matches } = window.matchMedia('(prefers-color-scheme: dark)');
    // console.log(matches);
    theme = matches ? 'dark' : 'light';

    localStorage.setItem('theme', theme);
  }
  /* theme의 값이 dark 면 dark 클래스를 추가하고, 아니면 추가하지 않는 코드. */
  document.body.classList.toggle('dark', theme === 'dark');
  
  /* 깜빡거림 제거 */
  setTimeout(() => {
    document.body.style.visibility = 'visible';
  }, 300);
});

document.querySelector('.toggle-button').onclick = e => {
  const theme = localStorage.getItem('theme');

  localStorage.setItem('theme', `${theme === 'dark' ? 'light' : 'dark'}`);

  document.body.classList.toggle('dark');
};
/* js에서 다크모드 감지. */
// const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
// console.log(darkModeMediaQuery);

// darkModeMediaQuery.addEventListener(e => {
//   const darkModeOn = e.matches;
//   console.log(`Dark mode is ${darkModeOn ? 'on' : 'off'}.`);
// });