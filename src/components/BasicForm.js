import useInput from "../hooks/use-input";

const BasicForm = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    InputBlurHandler: nameBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => {
    return value.trim() !== "";
  });

  const {
    value: enteredSName,
    isValid: enteredSNameIsValid,
    hasError: sNameInputHasError,
    valueChangeHandler: sNameChangedHandler,
    InputBlurHandler: sNameBlurHandler,
    reset: resetSNameInput,
  } = useInput((value) => {
    return value.trim() !== "";
  });

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    InputBlurHandler: emailBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => {
    return value.includes("@");
  });

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    emailBlurHandler(true);
    nameBlurHandler(true);

    if (!enteredNameIsValid || !enteredEmailIsValid || !enteredSNameIsValid) {
      return;
    }

    console.log(enteredName, enteredSName, enteredEmail);

    // nameInputRef.current.value = ''; => NOT IDEAL, DON'T MANIPULATE THE DOM
    resetEmailInput();
    resetNameInput();
    resetSNameInput();
  };

  let formIsValid = false;

  if (enteredNameIsValid && enteredSNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const sNameInputClasses = sNameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="control-group">
        <div className={nameInputClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            onChange={nameChangedHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
          />
        </div>
        <div className={sNameInputClasses}>
          <label htmlFor="sname">Last Name</label>
          <input
            type="text"
            id="sname"
            onChange={sNameChangedHandler}
            onBlur={sNameBlurHandler}
            value={enteredSName}
          />
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {(nameInputHasError || sNameInputHasError || emailInputHasError) && (
          <p className="error-text">A field is wrong.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
