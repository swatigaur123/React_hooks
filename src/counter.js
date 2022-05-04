
import { render } from "@testing-library/react";
import { useState } from "react";


const App = () => {

  const [counter, setCounter] = useState(42);
  return(
    <div>
      <h2 className="counteer">{counter}</h2>
      <button className="counter-button"  onClick={ () => setCounter(counter+1)}>Click</button>
    </div>
  )
}

export default App;