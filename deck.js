(function () {
  'use strict';

  const values = ['2','3','4','5','6','7','8','9','10','J','Q'];
  const suits = [
    { name: 'clubs',    symbol: '♣' },
    { name: 'diamonds', symbol: '♦' },
    { name: 'hearts',   symbol: '♥' },
    { name: 'spades',   symbol: '♠' }
  ];

  const isPortrait = window.innerHeight > window.innerWidth;
  const rowAxis = isPortrait ? values : suits;
  const colAxis = isPortrait ? suits : values;

  /* ---------- Styles ---------- */
  const style = document.createElement('style');
  style.textContent = `
        #card-overlay {
            position: relative;
            inset: auto;
            background: #3b1712;
            z-index: 1000;
            display: grid;
            grid-template-columns: repeat(${isPortrait ? suits.length : values.length}, 1fr);
            grid-template-rows: repeat(${isPortrait ? values.length : suits.length}, 1fr);
            gap: ${isPortrait ? '6px' : '12px'};
            padding: 20px;
            box-sizing: border-box;
        }

        #app {
            position: fixed;
            inset: 0;
            display: grid;
            grid-template-rows: auto 1fr;
            background: #0b0b0b;
        }

        #controls {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            background: #4a1b15;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        #controls .button {
            padding: 8px 14px;
            font-size: 14px;
            font-family: system-ui, sans-serif;
            font-weight: 600;
            color: #ffc061;
            background: #2b0a09;
            border: solid 2px #ffc061;
            border-radius: 6px;
            cursor: pointer;
        }

        #controls .button:hover {
            background: #f0f0f0;
        }

        #controls #github-button  {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: #fefefe;
            padding: 8px 14px;
            margin-left: auto;
        }

        #github-button img {
            display: block;
            height: 1.2em;
            width: auto;
        }

        #github-button:hover {
            opacity: 0.8;$
        }

        .card {
            background: #fbedc7;
            border: solid 2px #9f962c;
            border-radius: 8px;
            font-family: system-ui, sans-serif;
            font-size: 2.2rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            user-select: none;
            transition: opacity 0.15s ease;
        }

        .card.off {
            opacity: 0.5;
        }

        .card.hearts {
            color: #ea1639;
        }

        .card.diamonds {
            color: #865283;
        }

        .card.clubs {
            color: #26875e;
        }

        .card.spades {
            color: #294b66;
        }
    `;
  document.head.appendChild(style);

  /* ---------- Overlay ---------- */
  const app = document.createElement('div');
  app.id = 'app';
  document.body.appendChild(app);

  const overlay = document.createElement('div');
  overlay.id = 'card-overlay';

  /* ---------- Cards ---------- */
  rowAxis.forEach(rowItem => {
    colAxis.forEach(colItem => {

      const value = isPortrait ? rowItem : colItem;
      const suit  = isPortrait ? colItem : rowItem;

      const card = document.createElement('div');
      card.className = `card ${suit.name}`;
      card.textContent = `${value}${suit.symbol}`;

      card.addEventListener('click', () => {
        card.classList.toggle('off');
      });

      overlay.appendChild(card);
    });
  });

  /* ---------- Controls ---------- */
  const controls = document.createElement('div');
  controls.id = 'controls';

  /* -------- Reset button -------- */
  const resetButton = document.createElement('button');
  resetButton.id = 'reset-button';
  resetButton.classList.add('button');

  resetButton.textContent = 'Reset';
  
  resetButton.addEventListener('click', () => {
    app.querySelectorAll('.card.off').forEach(card => {
      card.classList.remove('off');
    });
  });

  /* -------- github button -------- */
  const githubButton = document.createElement('a');
  githubButton.id = 'github-button';
  githubButton.classList.add('button');

  githubButton.href = 'https://github.com/alt36/occlude-notes/';
  githubButton.setAttribute('aria-label', 'View project on GitHub');
  githubButton.target = '_blank';
  githubButton.rel = 'noopener noreferrer';

  const githubImage = document.createElement('img');
  githubImage.src = './assets/github-mark.png';
  githubImage.alt = 'GitHub';
  githubButton.appendChild(githubImage);

  controls.appendChild(resetButton);
  controls.appendChild(githubButton);

  /* -------- finally, build the app -------- */
  app.appendChild(controls);
  app.appendChild(overlay);

})();

