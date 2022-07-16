import React, {useState, useEffect} from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import {getActivities, createActivity, renderAllCountries} from '../../redux/actions'
import { Link } from 'react-router-dom';
import { validateCountry, validateDifficulty, validateDuration, validateName, validateSeason, isEmpty, errorExists } from '../validation/validation';


export default function CreateActivity() {

    let dispatch = useDispatch()

    useEffect(()=>{
        dispatch(renderAllCountries())
        dispatch(getActivities())
    },[dispatch])
    
    let countryNames = useSelector(state=>state.countries)
    let activities = useSelector(state=>state.activities)
    let checkingActivities = activities.map(a=>a.aName)
   
   /*  const [aname, setaName]=useState({aName:''})
    const [difficulty, setDifficulty] = useState({difficulty:''})
    const [season, setSeason]= useState({season:''})
    const [duration, setDuration] = useState({duration:''})
    const [country, setCountry] = useState({country:[]}) */


    const [durationTime, setDurationTime]=useState('')
    const [input, setInput]=useState({
        aName:'',
        difficulty:'',
        season:'',
        duration:'',
        country:[], 
    }) 

    const [durationMeasure, setDurationMeasure]=useState('')
    const [errors, setErrors] = useState({  });
    
    let handleNameChange = (e)=>{
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        const newError = validateName({
            ...input,
            aName: e.target.value
        }, checkingActivities) ;

        setErrors( {
            ...errors,
            ...newError
        })
    }
    

    let handleDifficultyChange = (e)=>{
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        const newError = validateDifficulty({
            ...input,
            difficulty: e.target.value
        }) ;
          setErrors( {
            ...errors,
            ...newError
        })
    }


    let handleSeason = (e)=>{
        e.preventDefault();
        setInput({
            ...input,
            season: e.target.value
        });
        const newError = validateSeason({
            ...input,   
            season: e.target.value
          }) ;
          setErrors( {
            ...errors,
            ...newError
        });
    }
    

    let handleDurationTime = (e)=>{
        e.preventDefault();
        setDurationTime(e.target.value)
        setDurationMeasure('')  
    }

    let handleDurationMeasure = (e)=>{
        e.preventDefault();
        setDurationMeasure(e.target.value)
        setInput({
            ...input,
            duration: (`${durationTime} ${durationMeasure}`)
            });
            const newError = validateDuration({
                ...input,
                duration: (`${durationTime} ${durationMeasure}`)
              }) ;
              setErrors( {
                ...errors,
                ...newError
            });
    }
   

    let handleCountries = (e)=> {
        e.preventDefault();
        setInput({
          ...input,
          country: [...input.country, e.target.value]
        })
        const newError = validateCountry({
            ...input,
            country: e.target.value
          }) ;
          setErrors( {
            ...errors,
            ...newError
        });
      }

      let handleDelete=(e)=>{
        let arr = input.country.filter((c)=>c!==e)
        setInput({
            ...input,
            country: arr
        })
      }

      const emptyInput = isEmpty(input)

      const fieldErrors = errorExists (errors) 
   
      let handleSubmit = (e) => {
        e.preventDefault();
        if(emptyInput||fieldErrors){
            alert('Wrong or missing information. Please check again')
            setErrors({
                ...errors,
                PostError:'check the red boxes'
            })
        }else{
        dispatch(createActivity(input))
        alert(`New Activity ${input.aName} created`)
        setInput({ 
            aName:'',
            difficulty:'',
            season:'',
            duration:'',
            country:[], 
        }) 
        setDurationTime('')  
        setDurationMeasure('')     
        }
    }

  return (
    <div>
         <Link to={'/'}>
            <button>Back to Rest of the world</button>
        </Link>
        <div>CreateActivity</div>
        <form onSubmit = {e=>handleSubmit(e)}>
        <div>
            <label>Name: </label>
            <input type={'text'} name={'aName'} value={input.aName} placeholder = 'Activity Name'
            onChange={(e) => handleNameChange(e)}/>
            {/* <button onClick={checkActivity}>check if it already exists</button> */}
            {errors.aName ? (
                <p >{errors.aName}</p>
              ) :null}
        </div>
        <div>
            <label>Difficulty: </label>
            <input type={'number'} name={'difficulty'} value={input.difficulty} placeholder = 'Difficulty from 1-5'
            onChange={(e) => handleDifficultyChange(e)}/>
            {errors.difficulty ? (
                <p >{errors.difficulty}</p>
              ) :null}
        </div>
        <div>
            <label>Duration: </label>
            <input type={'number'} name={'duration'} value={durationTime} placeholder = 'Activity duration'
            onChange={(e)=>handleDurationTime(e)}/>
            
            <select value={durationMeasure} onChange={(e)=>handleDurationMeasure(e)}>
            <option defaultValue={null}>Measure duration in...</option>
                <option value ={'minute/s'} >minute/s</option>
                <option value ={'hour/s'}>hour/s</option>
                <option value ={'day/s'}>day/s</option>
                <option value ={'week/s'}>week/s</option>
                <option value ={'month/s'}>month/s</option>
                <option value ={'year/s'}>year/s</option> 
            </select>
            
        </div>
        {errors.duration ? (
                <p >{errors.duration}</p>
              ) :null}

        <div>
            <label>Season: </label>
            <select value={input.season} onChange={(e) => handleSeason(e)}>
                <option defaultValue={null}>What time of the year?</option>
                <option value ={'summer'}>summer</option>
                <option value ={'autumn'}>autumn</option>
                <option value ={'winter'}>winter</option>
                <option value ={'spring'}>spring</option>
            </select>
        </div>
        {errors.season ? (
                <p >{errors.season}</p>
              ) :null}
        <label>Where can you do this activity?</label>
        <select  value={input.country} onChange={(e) => handleCountries(e)}>
            <option defaultValue={null} >Where can you do this?</option>
                {countryNames?.map((c)=>{
                    return(
                        <option value = {c.cName} key={c.id}>{c.cName}</option>
                    )
                })}
        </select> 
        {errors.country ? (
                <p >{errors.country}</p>
              ) :null}

        <br/>
        <button type={'submit'}>Create activity</button>
        {fieldErrors?(
                    <p>{errors.PostError}</p>
                
            ):null}
        </form>
        
        <div>
            <p>This is your activity so far....</p>
            {input.aName !== ''&&!errors.aName?<p>Name: {input.aName}</p>:null}
            {input.difficulty!==''&&!errors.difficulty?<p>Difficulty: {input.difficulty}</p>:null}
            {input.season!==''&&!errors.season?<p>Season: {input.season}</p>:null}
            {input.duration!==''&&!errors.duration?<p>Duration: {input.duration}</p>:null}
            {input.country?.map((e)=>{
                return(
                    <div key={e}>  {e}
                        <button onClick={()=>handleDelete(e)}> x </button>
                    </div>
                )})}
        
    </div>
    </div>
  )
}
