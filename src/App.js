/** @jsxImportSource @emotion/react */

import './App.css';

import { css } from '@emotion/react';

const wrapper = css`
  margin: 30px auto;
  width: 600px;
  display: flex;
  justify-content: space-evenly;

  header {
    display: flex;
    gap: 20px;
  }
  .guest {
    display: flex;
    gap: 40px;

    span {
      margin: 0 5px 0 5px;
    }
  }
`;

export default function App() {
  return (
    <div css={wrapper}>
      <div className="dispaly-list">
        <header>
          <h2>Remove</h2>
          <h2>Guest</h2>
          <h2>Attending</h2>
        </header>
        <main>
          <div className="guest">
            <div>
              <button>Remove</button>
            </div>
            <div>
              <span id="first-name">Karl</span>
              <span id="last-name">May</span>
            </div>
            <div>
              <input id="checkbox" type="checkbox" aria-label="Attending" />{' '}
            </div>
          </div>
          <div id="guest-input">
            <h2>Add new Guest</h2>
            <label>
              <input
                className="add-first-name"
                placeholder="Enter first name"
              />
            </label>
            <label>
              <input className="add-last-name" placeholder="Enter last name" />
            </label>
          </div>
        </main>
      </div>
    </div>
  );
}
