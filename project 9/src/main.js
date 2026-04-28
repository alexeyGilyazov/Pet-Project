const p = document.querySelector('.p')
p.style.backgroundColor = 'red'

document.addEventListener('mousemove', (e) => {
    p.style.top = `${e.clientY}px`
    p.style.left = `${e.clientX}px`
});
