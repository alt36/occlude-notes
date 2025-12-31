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
            background: #6e6e6e;
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
            padding: 12px 16px;
            background: #0b0b0b;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .card {
            background: #fbedc7;
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

        #reset-button {
            padding: 8px 14px;
            font-size: 14px;
            font-family: system-ui, sans-serif;
            font-weight: 600;
            background: #ffffff;
            border: none;
            border-radius: 6px;
            cursor: pointer;
        }

        #reset-button:hover {
            background: #f0f0f0;
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

  const resetButton = document.createElement('button');
  resetButton.id = 'reset-button';
  resetButton.textContent = 'Reset';
  
  resetButton.addEventListener('click', () => {
    app.querySelectorAll('.card.off').forEach(card => {
      card.classList.remove('off');
    });
  });

  controls.appendChild(resetButton);
  app.appendChild(controls);

	app.appendChild(overlay);
})();

