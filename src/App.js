/** @jsxImportSource @emotion/react */

import './App.css';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

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
  const [firstName, setFirstName] = useState();

  const [lastName, setLastName] = useState();

  const [loading, setLoading] = useState(true);

  const [guestList, setGuestList] = useState([]);

  // const baseUrl = 'http://desolate-crag-14718.herokuapp.com/guests/';

  useEffect(() => {
    async function getGuestList() {
      const data = await fetch(
        'http://desolate-crag-14718.herokuapp.com/guests/',
      );
      const guests = await data.json();
      const displayGuests = guests.map((guest) => {
        return {
          firstName: guest.firstName,
          lastName: guest.lastName,
          attending: true,
        };
      });
      setGuestList(displayGuests);
      setLoading(false);
    }
    getGuestList().catch(() => {
      console.log('fetch fails');
    });
  }, []);

 

  return loading ? (
    <h2>loading...</h2>
  ) : (

    <div css={wrapper}>
      <div className="dispaly-list">
        <header>
          <h2>Remove</h2>
          <h2>Guest</h2>
          <h2>Attending</h2>
        </header>

        <div className="guest">
          {guestList.map((guest) => {
            return (

              <div key={guest.id}>
                <span id="first-name">{guest.firstName}</span>
                <span id="last-name">{guest.lastName}</span>
                <div>
                  <button
                    onClick={() => {
                      const reducedList = (id) => {
                        guestList.filter((eachguest) => eachguest.id !== id);
                      };

                      setGuestList(reducedList);
                    }}
                  >
                    Remove 2.0
                  </button>
                </div>
              </div>
            );
          })}

          <div>
            <input id="checkbox" type="checkbox" aria-label="Attending" />
          </div>
          <button>Remove</button>
        </div>
        <div id="guest-input">
          <h2>Add new Guest</h2>
          <label>
            <input
              className="add-first-name"
              placeholder="Enter first name"
              onInput={(event) => {
                setFirstName(event.currentTarget.value);
              }}
            />
          </label>
          <label>
            <input
              className="add-last-name"
              placeholder="Enter last name"
              onInput={(event) => {
                setLastName(event.currentTarget.value);
                console.log(event.currentTarget);
              }}
            />
          </label>
        </div>
      </div>
    </div>

  );
}
