import React, {useState, useEffect} from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import {getActivities, createActivity, renderAllCountries} from '../../redux/actions'
import { Link } from 'react-router-dom';
import { validateCountry, validateDifficulty, validateDuration, validateName, validateSeason, isEmpty, errorExists } from '../validation/validation';
import styles from './createActivity.module.css'

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
        if(!input.country.includes(e.target.value)){
            setInput({
                ...input,
                country:[...input.country, e.target.value]
            })
        } else{
            setInput({
              ...input,
              country: [...input.country]
            })
        }
      
        const newError = validateCountry({
            ...input,
            country: e.target.value
          }, e.target.value) ;
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
    <div className={styles.background}>
        <div className={styles.contNavBarPadre}>
            <Link to={'/home'}>
                <button>Back to Rest of the world</button>
            </Link>
        </div>
    <div className={styles.DivPadre}>
        <h1 className={styles.title}>Create your activity</h1>
        <form onSubmit = {e=>handleSubmit(e)}>
            <div className={styles.DivFormPadre}>
            <div className={styles.FormTitle}>
                <label className={styles.TitleForm}>Name: </label>
                <input className={errors.aName ? styles.danger : styles.green}
                type={'text'} 
                name={'aName'} 
                value={input.aName} 
                placeholder = 'Activity Name'
                onChange={(e) => handleNameChange(e)}/>
                
                {errors.aName ? (
                    <p className={styles.danger}>{errors.aName}</p>
                ) :null}
            </div>
            <div className={styles.FormTitle}>
                <label className={styles.TitleForm}>Difficulty: </label>
                <input className={errors.difficulty ? styles.danger : styles.green}
                type={'number'} 
                name={'difficulty'} 
                value={input.difficulty} 
                placeholder = 'Difficulty from 1-5'
                onChange={(e) => handleDifficultyChange(e)}/>
                {errors.difficulty ? (
                    <p className={styles.danger}>{errors.difficulty}</p>
                ) :null}
            </div>
            <div className={styles.FormTitle}>
                <label className={styles.TitleForm}>Duration: </label>
                <input className={errors.duration ? styles.danger : styles.green}
                type={'number'} 
                name={'duration'} 
                value={durationTime} 
                placeholder = 'Activity duration'
                onChange={(e)=>handleDurationTime(e)}/>
            

               
                <select  className={styles.TitleForm} 
                value={durationMeasure} onChange={(e)=>handleDurationMeasure(e)}>
                <option defaultValue={null}>duracion del turno</option>
                    <option value ={'minute/s'} >minute/s</option>
                    <option value ={'hour/s'}>hour/s</option>
                    <option value ={'day/s'}>day/s</option>
                    <option value ={'week/s'}>week/s</option>
                    <option value ={'month/s'}>month/s</option>
                    <option value ={'year/s'}>year/s</option> 
                </select>
               
            </div>   
            
            {errors.duration ? (
                    <p className={styles.danger}>{errors.duration}</p>
                ) :null}

            <div className={styles.FormTitle}>
                <label className={styles.TitleForm}>Season: </label>
                <select className={errors.season ? styles.danger : styles.green} value={input.season} onChange={(e) => handleSeason(e)}>
                    <option defaultValue={null}>What time of the year?</option>
                    <option value ={'summer'}>summer</option>
                    <option value ={'autumn'}>autumn</option>
                    <option value ={'winter'}>winter</option>
                    <option value ={'spring'}>spring</option>
                </select>
            </div>
            {errors.season ? ( 
                    <p className={styles.danger}>{errors.season}</p>
                ) :null}
            <div className={styles.FormTitle}>
            <label className={styles.TitleForm}>Where can you do this activity?</label><br></br><br></br>
            <select className={errors.country? styles.danger : styles.green} value={input.country} onChange={(e) => handleCountries(e)}>
             <option className={styles.FormTitle} defaultValue={null} >Where can you do this?</option>
                    {countryNames?.map((c)=>{
                        return(
                            <option value = {c.cName} key={c.id}>{c.cName}</option>
                        )
                    })}
            </select> 
            </div>
            {errors.country ? (
                    <p className={styles.danger}>{errors.country}</p>
                ) :null}

            <br/>
            <button type={'submit'}>Create activity</button>
           
        </div>
        </form>
    </div>
        
        <div className={styles.card}>
            <div className={styles.cardText}>
                <h1 className={styles.titleCards}>Preview</h1>
                {input.aName !== ''&&!errors.aName?<p className={styles.titleCards}>Name: {input.aName}</p>:null}
                {input.difficulty!==''&&!errors.difficulty?<p className={styles.ps}>Difficulty: {input.difficulty}</p>:null}
                {input.season!==''&&!errors.season?<p className={styles.ps}>Season: {input.season}</p>:null}
                {input.duration!==''&&!errors.duration?<p className={styles.ps}>Duration: {input.duration}</p>:null}
                {input.country?.map((e)=>{
                    return(
                        <div className={styles.ps} key={e}>  {e}
                            <button onClick={()=>handleDelete(e)}> x </button>
                        </div>
                    )})}
                
            </div>
    </div>
    </div>
  )
}
