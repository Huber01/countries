export function validateName(input, checkingActivities) {
  let errors = { aName: null };
  if (!input.aName) {
    errors.aName = 'An Activity is required';
  } else if (input.aName[0] !== input.aName[0].toUpperCase()) {
    errors.aName = 'First letter must be an uppercase!';
  }else if(checkingActivities.includes(input.aName)){
    errors.aName = 'Activity already exists. Please type a new one'
  }
  return errors;
}


export function validateDifficulty(input){
  let errors= { difficulty: null };
  if (!input.difficulty) {
    errors.difficulty = 'Difficulty level is required';
  } else if (input.difficulty<1 || input.difficulty > 5){
    errors.difficulty = 'Difficulty level ranges from 1 to 5'
  }
  return errors
}

export function validateSeason(input){
  let errors={ season: null };
  if (!input.season) {
    errors.season = "Please, select a season";
  } 
  return errors
}

export function validateDuration(input){
  let errors={ duration: null };
  if (!input.duration || Number(input.duration[0])<1||input.duration[0]==='-') {
    errors.duration = "It should take more than 0 to do this!";
  }
  return errors
}

export function validateCountry(input){
  let errors={ country: null };
  if (!input.country.length) {
    errors.country = "Where can you do this?";
  } 
  return errors
}

export function errorExists (errors){if(errors.aName||errors.difficulty||errors.duration||errors.season||errors.country){
  return true
}else{
  return false
}}

export function isEmpty (input) {if(input.aName&&input.difficulty&&input.duration&&input.season&&input.country.length){
  return false
}else{
  return true
}}