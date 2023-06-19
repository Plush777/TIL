import React, { useState } from 'react';

const App = () => {
	const [inputValue,setInputValue] = useState('');
	const [list, setList] = useState([
        {
            id: 1,
            value: '리액트'
        },
        {
            id: 2,
            value: '리덕스'
        }
    ]);

    const addToList = () => {
        setList(() => {
            return [{
                id: list.length + 1,
                value: inputValue
            },
            ...list,
        ]
        });
        setInputValue('');
    }

  return (
    <>
		<input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={addToList}>추가</button>
        <ul>
            {list.map((item) => {
                return <li key={item.id}>{item.value}</li>
            })}
        </ul>
    </>
  );
}

export default App;
