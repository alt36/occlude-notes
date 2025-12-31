(function () {
  'use strict';

  const values = ['2','3','4','5','6','7','8','9','10','J','Q'];
  const suits = [
    { name: 'clubs',    symbol: '♣' },
    { name: 'diamonds', symbol: '♦' },
    { name: 'hearts',   symbol: '♥' },
    { name: 'spades',   symbol: '♠' }
  ];

  /* ---------- Styles ---------- */
  const style = document.createElement('style');
  style.textContent = `
        #card-overlay {
            position: fixed;
            inset: 0;
            background: #0b0b0b;
            z-index: 1000;
            display: grid;
            grid-template-columns: repeat(${values.length}, 1fr);
            grid-template-rows: repeat(${suits.length}, 1fr);
            gap: 12px;
            padding: 20px;
            box-sizing: border-box;
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
            position: fixed;
            top: 16px;
            right: 16px;
            z-index: 1100;
            padding: 8px 14px;
            font-size: 14px;
            font-family: system-ui, sans-serif;
            font-weight: 600;
            background: #ffffff;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }

        #reset-button:hover {
            background: #f0f0f0;
        }
    `;
  document.head.appendChild(style);

  /* ---------- Overlay ---------- */
  const overlay = document.createElement('div');
  overlay.id = 'card-overlay';

  /* ---------- Cards ---------- */
  suits.forEach(suit => {
    values.forEach(value => {
      const card = document.createElement('div');
      card.className = `card ${suit.name}`;
      card.textContent = `${value}${suit.symbol}`;

      card.addEventListener('click', () => {
        card.classList.toggle('off');
      });

      overlay.appendChild(card);
    });
  });

  document.body.appendChild(overlay);

  /* ---------- Reset button ---------- */
  const resetButton = document.createElement('button');
  resetButton.id = 'reset-button';
  resetButton.textContent = 'Reset';

  resetButton.addEventListener('click', () => {
    overlay.querySelectorAll('.card.off').forEach(card => {
      card.classList.remove('off');
    });
  });

  document.body.appendChild(resetButton);
})();

