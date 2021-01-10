import React, {useState} from 'react';
import Main from './components/Main'
import CarouselTile from './components/CarouselTile'


function App() {
  const [dash, setDash] = useState(false);

  function learnMoreClick(e) {
    setDash(e);
  }

  return (
    dash ? <Main/> : <CarouselTile onButtonClick={learnMoreClick}/>
  );
}

export default App;
