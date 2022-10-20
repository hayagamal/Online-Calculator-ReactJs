import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css"
import React, { useReducer, useState, useEffect } from 'react';
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";
import{Container} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebookF, faGithub, faLinkedinIn} from '@fortawesome/free-brands-svg-icons'
import BeatLoader from "react-spinners/BeatLoader";
import Particless from './components/ParticleBackground';
export const Actions ={
  Add: 'add',
  Clear: 'clear',
  Delete: 'delete',
  Choose: 'choose-operation',
  Evaluate: 'evaluate'

}
const initialState = {}

function reducer(state, {payload, type}){
  switch(type){
    case Actions.Add:
      if(state.overwrite){
        return{
          ...state,
          CurrentOperand: payload.digit,
          overwrite:false
        }
      }
      if(payload.digit === "0" && state.CurrentOperand ==="0") {return state}
      if(payload.digit === "." && state.CurrentOperand===".") {return state}
      return { ...state, CurrentOperand: `${state.CurrentOperand || ''}${payload.digit}`}
      
    case Actions.Clear:
      return initialState
      
    case Actions.Choose:
      if(state.CurrentOperand  == null && state.prevOperand == null){ return state}
      if(state.prevOperand == null){
        return{
          ...state, 
          operation: payload.operation,
          prevOperand: `${state.CurrentOperand}`,
          CurrentOperand: null
          
        }
        
      }
      if(state.CurrentOperand == null){
        return{
          ...state,
          operation: payload.operation,

        }
      }
      return{
        ...state,
        prevOperand: evaluate(state),
        operation:payload.operation,
        CurrentOperand: null

      }
      
    case Actions.Evaluate:
      if(state.CurrentOperand == null && state.prevOperand ==null){
        return state;
      }
      if(state.CurrentOperand && state.prevOperand == null) {return state}
      if(state.CurrentOperand == null && state.prevOperand) {return state}
      if(state.CurrentOperand!=null && state.prevOperand!=null){
        return{
          ...state,
          overwrite: true,
          prevOperand: null,
          operation:null,
          CurrentOperand: evaluate(state)
          
        }
      }
    case Actions.Delete:
      if(state.overwrite){
        return{
          ...state,
          overwrite:false,
          CurrentOperand:null
        }
      }
      if(state.CurrentOperand!=null){
        return {
          ...state,
          overwrite:false,
          CurrentOperand:  (state.CurrentOperand).slice(0,-1) 
        }
        
      }
      if(state.CurrentOperand == null ){
        return initialState;
      }
      
  }
}
function evaluate({CurrentOperand, prevOperand, operation}){
  const prev= parseFloat(prevOperand)
  const current=parseFloat(CurrentOperand)
  switch(operation){
    case '+':
      return prev + current
    case '-':
      return prev - current
    case 'x':
      return prev * current
    case '÷':
      return prev/current
  }

 
}
function App() {
  const [loading, setLoading] = useState(false)
  const [{prevOperand,CurrentOperand, operation },dispatch] = useReducer(reducer,initialState)
  useEffect(()=>{
    setLoading(true)
    
    setTimeout(()=>{
      setLoading(false)
      
    },3000)
  },[])
  return (
<div>  
 { loading ? (
  <React.Fragment>
      <h2>Online-Calculator</h2>
      <BeatLoader size={30} loading={loading} color={"white"} />
      <Particless />
      </React.Fragment>
      ) : 

      <React.Fragment>
        <Particless/>
       <div id="content-particles-js">
      <h2>Online-Calculator</h2>
      <div className='calculator-grid'>
    
    <div className="output">
    
    <div className="previous-operand">{prevOperand} {operation} </div>
    <div className="current-operand">{CurrentOperand}</div>
    </div>
    <button className='span-two' onClick={()=> dispatch({type: Actions.Clear})}>AC</button>
    <button onClick={()=>dispatch({type:Actions.Delete})}>DEL</button>
    <OperationButton dispatch={dispatch} operation="÷"/>
    <DigitButton dispatch={dispatch} digit="1"/>
    <DigitButton dispatch={dispatch} digit="2"/>
    <DigitButton dispatch={dispatch} digit="3"/>
    <OperationButton dispatch={dispatch} operation="x"/>
    <DigitButton dispatch={dispatch} digit="4"/>
    <DigitButton dispatch={dispatch} digit="5"/>
    <DigitButton dispatch={dispatch} digit="6"/>
    <OperationButton dispatch={dispatch} operation="+"/>
    <DigitButton dispatch={dispatch} digit="7"/>
    <DigitButton dispatch={dispatch} digit="8"/>
    <DigitButton dispatch={dispatch} digit="9"/>
    <OperationButton dispatch={dispatch} operation="-"/>
    <DigitButton dispatch={dispatch} digit="."/>
    <DigitButton dispatch={dispatch} digit="0"/>
    <button className='span-two' onClick={()=>dispatch({type: Actions.Evaluate, payload:{operation}}) } >=</button>
    
  </div>
  <Container>
  <div className='singleCol social-media-icons-white d-flex justify-content-center mt-5'>
  
  <a href="https://facebook.com/haya.gamal.56" > <FontAwesomeIcon icon={faFacebookF}/></a>
  <a href="https://github.com/hayagamal"> <FontAwesomeIcon icon={faGithub}/></a>
  <a  href="https://www.linkedin.com/in/haya-gamal/"> <FontAwesomeIcon icon={faLinkedinIn}/></a>

  </div>
 </Container>
</div>
  </React.Fragment>
      }
  </div>

  );
}

export default App;
