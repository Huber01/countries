import React, {useState, useEffect} from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import {getActivities, createActivity, renderAllCountries} from '../../redux/actions'
import { Link } from 'react-router-dom';
import { validateCountry, validateDifficulty, validateDuration, validateName, validateSeason } from '../validation/validation';


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

   /*  let[duration, setDuration]=useState({
        duration:''
    })*/

    
    const [durationTimeError, setDurationTimeError]= useState('')
    const [durationMeasure, setDurationMeasure]=useState('')
    const [errors, setErrors] = useState({});
    
    let handleNameChange = (e)=>{
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validateName({
            ...input,
            aName: e.target.value
          }))
    }
    
    let checkActivity = (e)=>{
        e.preventDefault()
        if(errors.aName){
            alert('please correct your spelling')
        }else if(checkingActivities.includes(input.aName)){
            alert('this activity already exists, choose another one');
            setInput({
                ...input,
                aName:''
            })
            setErrors({
                ...input,
                aName:''
            })
        }else{
        alert(`New activity! Click to continue creating ${input.aName}`)
        }
    }

    let handleDifficultyChange = (e)=>{
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validateDifficulty({
            ...input,
            difficulty: e.target.value
          }))
    }


    let handleSeason = (e)=>{
        e.preventDefault();
        setInput({
            ...input,
            season: e.target.value
        });
        setErrors(validateSeason({
            ...input,   
            season: e.target.value
          }));
    }
    
    let validate = (number)=>{
        let durationTimeError
        if (number<1) {
          durationTimeError = "It should take more than 0 to do this!";
        }
        return durationTimeError
      }

    let handleDurationTime = (e)=>{
        e.preventDefault();
        setDurationTime(e.target.value)
        setDurationTimeError(validate(e.target.value))
        
    }

    
    //console.log(durationTime)     


    let handleDurationMeasure = (e)=>{
        e.preventDefault();
        setDurationMeasure(e.target.value)
        
    }
   

    let submitDuration=(e)=>{
        e.preventDefault();
        setInput({
            ...input,
            duration: (`${durationTime} ${durationMeasure}`)
            });
        setErrors(validateDuration({
            ...input,
            duration: (`${durationTime} ${durationMeasure}`)
          }))
        /* setDurationTime('');
        setDurationMeasure('') */
    }


    let handleCountries = (e)=> {
        e.preventDefault();
        setInput({
          ...input,
          country: [...input.country, e.target.value]
        })
        setErrors(validateCountry({
            ...input,
            country: e.target.value
          }))
      }
      

   
      const emptyInput = !input.country.length&&Object.values(input.aName&&input.difficulty&&input.duration&&input.season).every(value => {
        if (!value) {
          return true;
        }
        return false;
      });
      
   
      let handleSubmit = (e) => {
        e.preventDefault();
        if(emptyInput||errors/* .aName || durationTimeError||errors.difficulty||errors.duration||errors.season||errors.country */){
            alert('Wrong or missing information. Please check again')
        }else{
        dispatch(createActivity(input))
        .then(() => {
            alert(`New Activity ${input.aName} created`)
            setInput({ 
                aName:'',
                difficulty:'',
                season:'',
                duration:'',
                country:[], 
           })
          .catch((err) => {
            console.log(err);
            alert("Could not create your country, please check your data");
          });       
        })
        }
    }

  let handleDelete=(e)=>{
    let arr = input.country.filter((c)=>c!==e)
    setInput({
        ...input,
        country: arr
    })
  }

  

  console.log(durationTimeError)
  console.log(emptyInput)
  console.log(errors)
  
  


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
            <button onClick={checkActivity}>check if it already exists</button>
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
            {durationTimeError?(
                <p>{durationTimeError}</p>):null
            }
            <select value={durationMeasure} onChange={(e)=>handleDurationMeasure(e)}>
            <option >Measure duration in...</option>
                <option value ={'minute/s'} >minute/s</option>
                <option value ={'hour/s'}>hour/s</option>
                <option value ={'day/s'}>day/s</option>
                <option value ={'week/s'}>week/s</option>
                <option value ={'month/s'}>month/s</option>
                <option value ={'year/s'}>year/s</option> 
            </select>
            <button onClick={(e)=>submitDuration(e)}>duration selected</button>
            
        </div>
        {errors.duration ? (
                <p >{errors.duration}</p>
              ) :null}

        <div>
            <label>Season: </label>
            <select value={input.season} onChange={(e) => handleSeason(e)}>
                <option defaultValue={''}>What time of the year?</option>
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
        <select  onChange={(e) => handleCountries(e)}>
            <option defaultValue={''} >Where can you do this?</option>
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
        </form>
        {input.aName !== ''?
        <div>
            <p>This is your activity so far....</p>
            <p>Name: {input.aName}</p>
            {input.difficulty!==''?<p>Difficulty: {input.difficulty}</p>:null}
            {input.season!==''?<p>Season: {input.season}</p>:null}
            {input.duration!==''?<p>Duration: {input.duration}</p>:null}
            {input.country?.map((e)=>{
                return(
                    <div key={e}>  {e}
                        <button onClick={()=>handleDelete(e)}> x </button>
                    </div>
                )})}

        
    </div>:null}
    </div>
  )
}
