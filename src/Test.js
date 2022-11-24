/** @jsxImportSource @emotion/react */

import './App.css';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

const wrapper = css`
  margin: 30px auto;
  width: 600px;
  // display: flex;
  justify-content: space-evenly;

  header {
    display: flex;
    gap: 20px;
  }
  .guest {
    display: flex;
    gap: 40px;
  }
  .guest-name span {
    margin: 0 5px 0 5px;
  }
`;

export default function Test() {
  const [guestList, setGuestList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [refetch, setRefetch] = useState(true);
  const [attending, setAttending] = useState(false);

  // delete request

  async function handleClick(id) {
    await fetch(`http://desolate-crag-14718.herokuapp.com/guests/${id}`, {
      method: 'DELETE',
    });
    setIsLoading(false);
  }

  useEffect(() => {
    fetch('http://desolate-crag-14718.herokuapp.com/guests/')
      .then((response) => {
        // here could be checked for fecht-errors if (!response.ok {trow Error('Error!')}), checking the response object
        // response object (after promise resolved), not the data
        return response.json(); // this passes json into in JS Object
      })
      .then((data) => {
        console.log(data); // as soon as response is return, here is the actual data
        setGuestList(data); // taking the returnd Array of objects and updating the guestList
        setIsLoading(false); // for Loading message, after data is feched, will be set fale and than stop to orrcure
      })
      .catch(() => {
        console.log('fetch fails'); // other good idea: .catch(err => {console.log(err.message)}), logs the actual error message
        // console.log(firstName, lastName);
      });
  }, []);

  async function addGuest(firstName, lastName) {
    const requestOptions = await fetch(
      'http://desolate-crag-14718.herokuapp.com/guests/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
        }),
      },
    );

    /* const updatetList = [
      ...guestList,
      {
        firstName: firstName,
        lastName: lastName,
        id: guest.id
      },
    ];
    setGuestList(updatetList);
    // setIsLoading(false);
    // setRefetch(false);
  }; */
  }

  const handleAttending = (id) => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        attending: !attending,
      }),
    };
  };

  return isLoading ? ( // Ternary to delay the rendering of map, if there is no operater, map has property of null because it is rendert before data is fetched
    <h2>Loading...</h2> // if isLoading is true (initial state), there will bis loading... it its false (after fechting) the list will be showen
  ) : (
    <div css={wrapper}>
      <div className="dispaly-list">
        <header>
          <h2>Remove</h2>
          <h2>Guest</h2>
          <h2>Attending</h2>
        </header>

        <div className="guest-display">
          {guestList.map(
            (
              guest, // JS inside JSX. Mapping over the fetched guestList
            ) => (
              <div className="guest-name" key={guest.id}>
                <span id="first-name">{guest.firstName}</span>
                <span id="last-name">{guest.lastName}</span>

                <input
                  id={guest.id}
                  type="checkbox"
                  aria-label="Attending"
                  checked={attending}
                  onChange={(event) => {
                    setAttending(event.currentTarget.checked);
                    console.log(event);

                    const id = guest.id;
                    handleAttending(id);
                  }}
                />
                <div>
                  <button
                    onClick={() => {
                      const reducedGuestList = guestList.filter(
                        (eachGuest) => eachGuest.id !== guest.id,
                      );
                      console.log(reducedGuestList);
                      console.log(guestList);

                      const id = guest.id;
                      console.log(id);
                      setGuestList(reducedGuestList);
                      // setRefetch(!refetch);
                      handleClick(id).catch(() => {
                        console.log('Delte failed');
                      });
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
      <div id="guest-input">
        <h2>Add new Guest</h2>
        <form>
          <label>
            <input
              type="input"
              className="add-first-name"
              placeholder="Enter first name"
              value={firstName}
              onChange={(event) => setFirstName(event.currentTarget.value)}
            />
          </label>
          <label>
            <input
              type="input"
              className="add-last-name"
              placeholder="Enter last name"
              value={lastName}
              onChange={(event) => setLastName(event.currentTarget.value)} // event-object
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  const updatetList = [
                    ...guestList,
                    {
                      firstName: firstName,
                      lastName: lastName,
                    },
                  ];
                  addGuest(firstName, lastName).catch(() => {
                    console.log('Post fails');
                  });
                  console.log('first', firstName);
                  setGuestList(updatetList);
                }
              }}
            />
          </label>
        </form>
      </div>
    </div>
  );
}
