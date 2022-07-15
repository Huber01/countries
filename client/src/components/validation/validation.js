export function validateName(input) {
  let errors = {};
  if (!input.aName) {
    errors.aName = 'An Activity is required';
  } else if (input.aName[0] !== input.aName[0].toUpperCase()) {
    errors.aName = 'First letter must be an uppercase!';
  }
  /*  if (!input.difficulty) {
    errors.difficulty = 'Difficulty level is required';
  } else if (input.difficulty<1 || input.difficulty > 5){
    errors.difficulty = 'Difficulty level ranges from 1 to 5'
  }
   if (!input.season) {
    errors.season = "Please, select a season";
  } 
  if (!input.duration || Number(input.duration[0])<1) {
    errors.duration = "It should take more than 0 to do this!";
  }
  
  if (!input.country.length) {
    errors.country = "Where can you do this?";
  }  */  
  return errors;
}

export function validateDifficulty(input){
  let errors={};
  if (!input.difficulty) {
    errors.difficulty = 'Difficulty level is required';
  } else if (input.difficulty<1 || input.difficulty > 5){
    errors.difficulty = 'Difficulty level ranges from 1 to 5'
  }
  return errors
}

export function validateSeason(input){
  let errors={};
  if (!input.season) {
    errors.season = "Please, select a season";
  } 
  return errors
}

/* export function validateDurationTime(number){
  
  if (durationTime<1) {
    durationTimeError = "It should take more than 0 to do this!";
  }
  return durationTimeError
}
 */
export function validateDuration(input){
  let errors={};
  if (!input.duration || Number(input.duration[0])<1) {
    errors.duration = "It should take more than 0 to do this!";
  }
  return errors
}

export function validateCountry(input){
  let errors={};
  if (!input.country.length) {
    errors.country = "Where can you do this?";
  } 
  return errors
}