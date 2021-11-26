
import { useReducer } from 'react';
import './App.css';
import Digitbuttton from './Digitbutton';
import OperationButton from './Operationbutton';

export const ACTIONS = {
ADD_DIGIT : 'add-digit',
CHOOSE_OPERATIONS : 'choose-operations',
DELETE_DIGIT:'delete-digit',
CLEAR:'clear',
EVALUATE:'evaluate'

}

function reducer (state , {type , payload } ) {

  switch (type) {
    case ACTIONS.ADD_DIGIT: 

    if(state.overwrite){
      return {
...state,
  currentOperand : payload.digit,
  overwrite : false
    }

  }


    if(payload.digit === "0" && state.currentOperand === "0") {

     return state
    }

    if(payload.digit === '.' && state.currentOperand?.includes('.')){

 return state
}

     return {
       ...state,
       currentOperand : `${state.currentOperand || ""}${payload.digit}`
     }
      
    case ACTIONS.CLEAR : 

    return {}
  
     
        
     case ACTIONS.CHOOSE_OPERATIONS :     
     
     if(state.previousOperand == null && state.currentOperand == null) {  

         return state  

           }   

   if(state.previousOperand == null) {   

      return {  
   ...state,    
Operation : payload.operation,  
 previousOperand: state.currentOperand,   
currentOperand : null 

}  
                
    }

if(state.currentOperand == null){

  return{
...state,
    Operation: payload.operation



  }

}



return {
  ...state ,
  previousOperand: Evaluate(state),
  Operation: payload.operation,
  currentOperand : null
}


case ACTIONS.EVALUATE : 

if(state.currentOperand ==  null  || state.previousOperand ==  null || state.Operation == null  ){

  return state

}

return {

  ...state,
 overwrite : true,
  previousOperand: null,
  Operation: null,
  currentOperand: Evaluate(state)


}


case ACTIONS.DELETE_DIGIT : 

if(state.overwrite){
  return {
    ...state,
    currentOperand : null,
    overwrite :  false 

  }
}

if(state.currentOperand == null ) return state
if(state.currentOperand.length === 1){
  return { ...state , currentOperand : null}
}


return {
...state,
currentOperand: state.currentOperand.slice(0,-1)

}
    
  }
  
  
}


function Evaluate ({currentOperand,previousOperand,Operation}){

  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if( isNaN(prev) || isNaN(current)){
    return ""
  }
let values  = " "

switch (Operation) {

  case '+':
    values =  prev+current
    break;

    case '-':
      values =  prev-current
      break;

    case '*':
        values =  prev*current
       break;

       case '/':
    values =  prev/current
    break; 


      }

return  values.toString();

}




function App() {

const [{currentOperand,previousOperand,Operation}, dispatch] = useReducer(reducer, {})


  return (
    <div className="calculator">

    <div className="output">
      <div className="previous-operand">{previousOperand} {Operation}</div>
      <div className="current-operand">{currentOperand}</div>
      </div>  
    
    <button className="span-two" onClick={()=> dispatch({type: ACTIONS.CLEAR })} >AC</button>
    <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
    <OperationButton operation="/" dispatch={dispatch} />
    <Digitbuttton digit='1' dispatch={dispatch}  />
    <Digitbuttton digit='2' dispatch={dispatch}  />
    <Digitbuttton digit='3' dispatch={dispatch}  />
    <OperationButton operation="*" dispatch={dispatch} />
    <Digitbuttton digit='4' dispatch={dispatch}  />
    <Digitbuttton digit='5' dispatch={dispatch}  />
    <Digitbuttton digit='6' dispatch={dispatch}  />
    <OperationButton operation="+" dispatch={dispatch} />
    <Digitbuttton digit='7' dispatch={dispatch}  />
    <Digitbuttton digit='8' dispatch={dispatch}  />
    <Digitbuttton digit='9' dispatch={dispatch}  />
   <OperationButton operation="-" dispatch={dispatch} />
    <Digitbuttton digit='.' dispatch={dispatch}  />
    <Digitbuttton digit='0' dispatch={dispatch}  />
    <button className="span-two" onClick = {() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>


    </div>
  );
}

export default App;
