import React, {useState, useEffect} from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import {getCountryNames} from '../../redux/actions'


export default function CreateActivity() {
    /* let dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getCountryNames())
    }) */
    
    //let countryNames = useSelector(state=>state.countryNames)
    
    let [input, setInput]=useState({
        aName:'',
        difficulty:'',
        duration:'',
        season:'',
        countries:[]
    })

    let handleChange = (e)=>{
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: [e.target.value]
        })
    }
    let handleDuration = (e,ev)=>{
        e.preventDefault();
        e.target.value=[e.target.value].concat[ev.target.value]
        setInput({
            ...input,
            [e.target.name]: [e.target.value]
        })
        console.log(e.target.value)
    }

   /*  let handleSubmit = (e)=>{

    } */


  return (
    <div>
        <div>CreateActivity</div>
        {/* <form onSubmit = {e=>handleSubmit(e)}> */}
        <div>
            <label>Name: </label>
            <input type={'text'} name={'aName'} value={input.aName} placeholder = 'Activity Name'
            onChange={(e) => handleChange(e)}/>
        </div>
        <div>
            <label>Difficulty: </label>
            <input type={'range'} name={'difficulty'} value={input.aName} placeholder = 'Difficulty from 1-5'
            onChange={(e) => handleChange(e)}/>
        </div>
        <div>
            <label>Duration: </label>
            <input type={'number'} name={'duration'} value={input.duration} placeholder = 'Activity Name'
            onChange={(e)=>handleDuration(e)}/>
            <select onChange={(ev)=>handleDuration(ev)}>
                <option value ={'minute/s'}>minute/s</option>
                <option value ={'hour/s'}>hour/s</option>
                <option value ={'day/s'}>day/s</option>
                <option value ={'week/s'}>week/s</option>
                <option value ={'month/s'}>month/s</option>
                <option value ={'year/s'}>year/s</option>
            </select>
            <input type={''} name={'duration'} value={input.aName} placeholder = 'Activity Name'
            onChange={(e) => handleChange(e)}/>
        </div>
        <div>
            <label>Season: </label>
            <input type={"text"} name={'season'} value={input.aName} placeholder = 'Activity Name'
            onChange={(e) => handleChange(e)}/>
        </div>

        {/* </form> */}
    </div>
  )
}
