
import { useEffect, useMemo, useState } from "react";


function App({ data }) {

  const[selectedButtons, setSelectedButtons] =useState([]);
  const[removedButtons, setRemovedButtons]= useState([]);

  //it can be case, when user has selected city first then country or viceversa
  useEffect(() => {
    if(selectedButtons.length === 2){
      if((data[selectedButtons[0]] === selectedButtons[1]) || (data[selectedButtons[1]] === selectedButtons[0])) {
          setRemovedButtons([...removedButtons, ...selectedButtons]);
          setSelectedButtons([]);
        }
    }
  }, [selectedButtons]);

  /**
   * During initial rendering, useMemo(compute, dependencies) invokes compute, memoizes the calculation result, and returns it to the component.
    If during next renderings the dependencies don't change, then useMemo() doesn't invoke compute but returns the memoized value.
    But if dependencies change during re-rendering, then useMemo() invokes compute, memoizes the new value, and returns it.
  */
  const buttonList = useMemo (() => {
    console.log(data);
    if(removedButtons.length!=0){
      if(removedButtons[0] in data){
        console.log("removedButtons", removedButtons);
        console.log("data", data);
        console.log('removedButtons[0] in data', data[removedButtons[0]] )
        delete data[removedButtons[0]];
      }
      else{
        delete data[removedButtons[1]];
      }
      setRemovedButtons([]);
    }
    const buttons= [...Object.keys(data), ...Object.values(data)];
    
    /**
     * The Fisher-Yates algorith
      Luckily for us, it's not too complicated:
      const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      }
As you can see it’s just a case of looping through the array (from the end to the start) and picking a random item from the array and swapping it with the item in the current iteration.

You can use the above function to shuffle an array in JavaScript and get a random result each time.
Sorts an array in place. This method mutates the array and returns a reference to the same array.

@param compareFn
Function used to determine the order of the elements. It is expected to return a negative value if first argument is less than second argument, zero if they're equal and a positive value otherwise. 
omitted, the elements are sorted in ascending, ASCII character order.

[11,2,22,1].sort((a, b) => a - b)
Math.random() returns Returns a pseudorandom number between 0 and 1.
Math.random() - 0.5 is a random number that may be positive or negative, so the sorting function reorders elements randomly. we pass to .sort() is lookingfor either a positive or negative number to either move the item ‘up’ or ‘down’ in the array, each item has a chance of being moved in either direction giving us a shuffled array of items.
It's fine if you need to randomize relatively small array and not dealing with cryptographic things. I totally agree that if you need more randomness you need to use more complex solution.
*/
   //const randomButtons= buttons.sort(() => 0.5 - Math.random());
   const randomButtons=shuffleArray(buttons);
    return randomButtons;
  },[data, removedButtons]);

  const handleButtonClick = (button) =>{
    if(selectedButtons.length === 2){
      setSelectedButtons([button]);
    }
    else if (!selectedButtons.includes(button)){
      setSelectedButtons([...selectedButtons, button]);
    }
  }

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  const getBackgroundColor = (button) =>{
    if(selectedButtons.length ===2 && selectedButtons.includes(button)){
      return '#ff0000';
    }
    else if(selectedButtons.includes(button)){
      return '#0000ff';
    }
    else{
      return '#ffffff';
    }
  }
  
  return (
    <div className="App">
      {buttonList.map((button) => 
        <button 
            key={button} 
            onClick={() => handleButtonClick(button)}
            style= {{margin: '2px', background:getBackgroundColor(button)}}
            >{button}
        </button>
      )}
      {buttonList.length === 0 && <div>Congratulations</div>}
    </div>
  );
}

export default App;
