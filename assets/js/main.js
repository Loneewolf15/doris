/* ══════════ COMMON UTILITIES ══════════ */
const em = ['💗', '💙', '🌸', '✨', '💖', '🌷', '⭐'];

function spawnHearts(n) {
    const cx2 = innerWidth / 2, cy = innerHeight / 2;
    for (let i = 0; i < (n || 1); i++) {
        setTimeout(() => {
            const el = document.createElement('div'); el.className = 'fheart';
            el.textContent = em[Math.floor(Math.random() * em.length)];
            el.style.cssText = `left:${cx2 + (Math.random() - .5) * 200}px;top:${cy + (Math.random() - .5) * 100}px;font-size:${.9 + Math.random() * 1.2}rem;`;
            document.body.appendChild(el); setTimeout(() => el.remove(), 2200);
        }, i * 30);
    }
}

document.addEventListener('click', e => {
    if (e.target.closest('#gate') || e.target.closest('#conf-screen') || e.target.closest('.mnav-btn') || e.target.closest('.music-pill') || e.target.closest('.heart-btn') || e.target.closest('.pg-next') || e.target.closest('.pd')) return;
    const el = document.createElement('div'); el.className = 'fheart'; el.textContent = em[Math.floor(Math.random() * em.length)]; el.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;font-size:${.9 + Math.random() * .7}rem;`; document.body.appendChild(el); setTimeout(() => el.remove(), 2200);
});

/* ══════════ CURSOR ══════════ */
const cDot = document.getElementById('cDot'), cRing = document.getElementById('cRing');
if (cDot && cRing) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function tc() { rx += (mx - rx) * .15; ry += (my - ry) * .15; cDot.style.cssText = `left:${mx}px;top:${my}px;`; cRing.style.cssText = `left:${rx}px;top:${ry}px;`; requestAnimationFrame(tc); })();
    if ('ontouchstart' in window) { cDot.style.display = 'none'; cRing.style.display = 'none'; document.body.style.cursor = 'auto'; }
}

/* ══════════ GLOBAL STARFIELD ══════════ */
const bsc = document.getElementById('bg-stars');
if (bsc) {
    const bsctx = bsc.getContext('2d');
    function resizeBs() { bsc.width = innerWidth; bsc.height = innerHeight; } resizeBs();
    window.addEventListener('resize', resizeBs);
    const bStars = Array.from({ length: 280 }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: .15 + Math.random() * 1.5, op: .1 + Math.random() * .85, tp: Math.random() * Math.PI * 2, ts: .004 + Math.random() * .012, col: ['#fff', '#C5D4FF', '#F2B8C9', '#E8C88A'][Math.floor(Math.random() * 4)] }));
    const bBright = Array.from({ length: 15 }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: 1.6 + Math.random() * 2, op: .6 + Math.random() * .4, tp: Math.random() * Math.PI * 2, ts: .007 + Math.random() * .01, col: '#fff' }));
    (function drawBs() {
        bsctx.clearRect(0, 0, bsc.width, bsc.height);
        [...bStars, ...bBright].forEach(s => {
            s.tp += s.ts; const a = s.op * (.5 + .5 * Math.sin(s.tp));
            bsctx.save(); bsctx.globalAlpha = a;
            if (s.r > 1.6) { const g = bsctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4); g.addColorStop(0, s.col); g.addColorStop(1, 'transparent'); bsctx.fillStyle = g; bsctx.beginPath(); bsctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2); bsctx.fill(); }
            bsctx.fillStyle = s.col; bsctx.beginPath(); bsctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); bsctx.fill(); bsctx.restore();
        });
        requestAnimationFrame(drawBs);
    })();
}

/* ══════════ RAIN ══════════ */
const rcv = document.getElementById('rain');
if (rcv) {
    const rctx = rcv.getContext('2d');
    function resizeR() { rcv.width = innerWidth; rcv.height = innerHeight; } resizeR();
    window.addEventListener('resize', resizeR);
    const rChars = ['♡', '✦', '·', '˚', '✿', '*', '❀'], rCols = ['#F2B8C9', '#E8547A', '#6B8EF0', '#2B4BC7', '#EDE0D0'];
    const rDrops = Array.from({ length: 40 }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, sp: .3 + Math.random() * .6, ch: rChars[Math.floor(Math.random() * rChars.length)], col: rCols[Math.floor(Math.random() * rCols.length)], sz: 9 + Math.random() * 11, op: .07 + Math.random() * .18, dr: (Math.random() - .5) * .2 }));
    (function drawR() { rctx.clearRect(0, 0, rcv.width, rcv.height); rDrops.forEach(d => { rctx.save(); rctx.globalAlpha = d.op; rctx.fillStyle = d.col; rctx.font = `${d.sz}px serif`; rctx.fillText(d.ch, d.x, d.y); rctx.restore(); d.y += d.sp; d.x += d.dr; if (d.y > rcv.height + 20) { d.y = -20; d.x = Math.random() * rcv.width; } if (d.x < -20 || d.x > rcv.width + 20) d.dr *= -1; }); requestAnimationFrame(drawR); })();
}

/* ══════════ MUSIC ══════════ */
const bgm = document.getElementById('bgm'), mBtn = document.getElementById('mBtn'), mLbl = document.getElementById('mLbl');
if (bgm && mBtn) {
    let musicPlaying = localStorage.getItem('musicPlaying') === 'true';

    function updateMusicUI() {
        if (musicPlaying) {
            mBtn.classList.remove('paused');
            mLbl.textContent = 'Music on';
        } else {
            mBtn.classList.add('paused');
            mLbl.textContent = 'Play music';
        }
    }

    function tryMusic() {
        bgm.volume = .32;
        if (musicPlaying) {
            bgm.play().catch(() => {
                // If autoplay is blocked, update UI to show it's paused
                musicPlaying = false;
                localStorage.setItem('musicPlaying', 'false');
                updateMusicUI();
            });
        }
    }

    mBtn.addEventListener('click', () => {
        if (musicPlaying) {
            bgm.pause();
            musicPlaying = false;
        } else {
            bgm.play();
            musicPlaying = true;
        }
        localStorage.setItem('musicPlaying', musicPlaying);
        updateMusicUI();
    });

    // Initial UI state
    updateMusicUI();
    
    // We'll call tryMusic() manually when appropriate (e.g. after intro or on load)
}

/* ══════════ PAGE ANIMATION ══════════ */
window.addEventListener('DOMContentLoaded', () => {
    const activePage = document.querySelector('.page');
    if (activePage) {
        // Delay slightly for smooth entrance
        setTimeout(() => activePage.classList.add('active'), 100);
    }
});

/* ══════════ DOTS ══════════ */
const dotsWrap = document.getElementById('pageDots');
if (dotsWrap) {
    const pages = ['index.html', 'moments.html', 'letter.html', 'love.html', 'wishes.html', 'closing.html'];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    pages.forEach((p, i) => {
        const d = document.createElement('a');
        d.href = p;
        d.className = 'pd';
        if (p === currentPage) d.classList.add('on');
        // If not on index, make dots dark
        if (currentPage !== 'index.html') d.classList.add('dark');
        dotsWrap.appendChild(d);
    });
}
