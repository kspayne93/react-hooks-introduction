import React from 'react';

import { useHttp } from '../hooks/http';
import './CharPicker.css';

const CharPicker = props => {
     // const [loadedChars, setLoadedChars] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect gets run AFTER the component render cycle has finished. Similar to componentDidMount. If we want code to execute before the component gets rendered we put the code above this line since the function code gets executed top to bottom. One thing to note is that componentDidMount traditionally gets rendered once, however useEffect gets run more often.

  //useEffect takes in two arguments. The first one is a function that gets executed. The second argument is an array. In this array, we specify all of the dependencies (variables) that useEffect will watch for updates on. If one of those gets updated, useEffect will get run again and the component will re-render. If no second argument is passed, the component will re-render and every time state or props change. When making api fetches, this will cause an infinite loop. To make useEffect the equivalent of componentDidMount (meaning it only runs once), we need to keep the array empty. By passing useEffect an empty array as its second argument, the code gets executed once after the initial render. This is perfect for api calls. 
  
  // useEffect(() => {
  //   setIsLoading(true);
    
  // }, []); // <-- here is the empty array
  const [isLoading, fetchedData] = useHttp('https://swapi.co/api/people', []);

  const selectedCharacters = fetchedData
    ? fetchedData.results.slice(0, 5).map((char, index) => ({
        name: char.name,
        id: index + 1
      }))
    : [];

  let content = <p>Loading characters...</p>;

  if (!isLoading && selectedCharacters && selectedCharacters.length > 0) {
    content = (
      <select
        onChange={props.onCharSelect}
        value={props.selectedChar}
        className={props.side}
      >
        {selectedCharacters.map(char => (
          <option key={char.id} value={char.id}>
            {char.name}
          </option>
        ))}
      </select>
    );
  } else if (
    !isLoading &&
    (!selectedCharacters || selectedCharacters.length === 0)
  ) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
};

export default CharPicker;