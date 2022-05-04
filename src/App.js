
import { buildQueries } from "@testing-library/dom";
import { useEffect, useMemo, useState } from "react";

const App = ({data}) => {

  const [selectedButtons, setSelectedButtons] = useState([])
  const [removedButtons, setRemovedButtons] = useState([])


  /**
   * as it accepts a function and a list of dependencies but it returns the memoized value returned by the passed function. It recalculated the value only
   *  when one of its dependencies change. It is useful to avoid expensive calculations on every render when the returned value is not going to change
   */
 const buttonList = useMemo(() => {
  if (removedButtons.length != 0) {
    if (removedButtons[0] in data){
      delete data[removedButtons[0]]
    }
    else {
     delete data[removedButtons[1]]
    }
    setRemovedButtons([])
  }
 const buttons = [...Object.keys(data), ...Object.values(data)];
 const randomButtonsList = buttons.sort(() => 0.5 - Math.random());
 return randomButtonsList;
}, [data,removedButtons]);

const getButtonColor = (button) =>{
  return (selectedButtons.length ===2 && selectedButtons.includes(button) ? '#ff0000' :  selectedButtons.includes(button) ?  '#0000ff' :'#ffffff');
//  if(selectedButtons.length ===2 && selectedButtons.includes(button)){
//    return '#ff0000';
//  }
//  else if(selectedButtons.includes(button)){
//    return '#0000ff';
//  }
//  else{
//    return '#ffffff';
//  }
}

/**
 * A hook that helps us to perform mutations, subscriptions, timers, logging, and other side effects after all the components has been rendered. 
 * The useEffect accepts a function that is imperative in nature and a list of dependencies. When its dependencies change it executes the passed function.
 */

  useEffect(() => {
    if (selectedButtons.length===2){
      if((data[selectedButtons[0]] === selectedButtons[1]) || (data[selectedButtons[1]] === selectedButtons[0])){
        setRemovedButtons([...removedButtons, ...selectedButtons]);
        console.log('removedButtons', removedButtons);
        setSelectedButtons([]);
      }
    }
  }, [selectedButtons])


const handleClick = (button) => {
  if(selectedButtons.length ===2){
    setSelectedButtons([button])
    console.log('selectedButtons in if', selectedButtons)
  }
  else if(!selectedButtons.includes(button)){
    setSelectedButtons([...selectedButtons, button])
    console.log('selectedButtons', selectedButtons)
  }
}





  return (
    <div className="App">
      {
      buttonList.map((button) => (
       
          <button
          key= {button}
          onClick= {() => handleClick(button)}
          style= {{margin: '2px', background: getButtonColor(button) }}
          >{button}</button>
        
      ))
    }
    {
      buttonList.length===0 &&
      <div>
        Congratulations
      </div>
    }
    </div>

  )
}

export default App