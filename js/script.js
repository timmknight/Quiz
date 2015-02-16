window.onload = function(){

//Variables
  var questionNum = 0;
  var answerArray = [];
//Questions Array
  var allQuestions = [
{question: "Who is Prime Minister of the United Kingdom?", choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"], correctAnswer:0}, {question: "What is the capital of England?", choices: ["London", "Cambridge"], correctAnswer:0}, {question: "What is the capital of France?", choices: ["London", "Berlin", "Rome", "Paris"], correctAnswer:3}, {question: "What is the capital of Italy?", choices: ["London", "Berlin", "Rome", "Paris"], correctAnswer:2}];

//Create the start quiz button
  var button = document.getElementById('start');
  button.onclick = startQuiz;

//Remove the introduction and start button and add first question and options
  function startQuiz(){
    endOfQuiz();
      console.log(answerArray);

  // Get question
    var question = allQuestions[questionNum].question;

  // Remove introduction text and replace with question
    para.textContent = question;

  //Create form for radio buttons
    var createForm = document.createElement('form');
    createForm.id = "radioContainer";
    document.getElementById('para').appendChild(createForm);

  //Make radio Button function
    function makeRadioButton(name, value, text) {
    // Create label and input, label makes it so you can select the option text
      var label = document.createElement("label");
      var radio = document.createElement("input");
      radio.type = "radio";
      radio.name = name;
      radio.value = value;
      radio.id = i;
      label.className = "label";
    // Add radio button to label element, then add the text which will be the answer text
      label.appendChild(radio);
      label.appendChild(document.createTextNode(text));
      return label;
    }

  //Create radio buttons for each option in the choices array
  // This gets the number of answers
    var choicesLength = allQuestions[questionNum].choices.length;
    for (var i = 0; i < choicesLength; i++) {
    //This gets each indivdual answer
      var choiceArr = allQuestions[questionNum].choices[i];
    //Calls the makeRadioButton function with the index and answer text
      var choiceRadio = makeRadioButton("choice", i, choiceArr);
      radioContainer.appendChild(choiceRadio);
    }

  //Create submit answer button
    var submitButton = document.createElement('BUTTON');
    submitButton.id = "submit";
    button.textContent = "Next";
    document.getElementById('buttons').appendChild(button);

  //When user clicks submit call checkAnswer then go to next question
    button.onclick = checkAnswer;

  // This returns the id of the radio button that the user has selected
    function getRadioValue(){
      var inputs = document.getElementsByName("choice");
      for (var i = 0; i < inputs.length; i++) {
        if(inputs[i].checked){
          return inputs[i].value;
        }
      }
    }

  //This takes the currently selected radio id from getRadioValue and checks to see
  //if it is the same as the correct answer value. This all happens when the user
  //clicks the submit answer button.
  // If the answer is correct a 1 is added to the answerArray, if its wrong a 0 is added
  // If the checkAnswerSelected returns true the next question appears otherwise the
  // alert will appear and questionNum will have 1 taken from it. This ensures questionNum
  //is always correct
    function checkAnswer(){
      var id = getRadioValue();
      if( id == allQuestions[questionNum].correctAnswer){
        answerArray.push(1);
      }else{
        answerArray.push(0);
      }
      questionNum++;
      if (checkAnswerSelected() === true){
        startQuiz();
      }else{
        questionNum--;
      }
    }

  //Checks to see is this is the last question if it is creates the count object
  //Then iterates through the answerArray and adds up how many 1 and 0s there are
  //these are then added to the object.
  //if there are only 0s ie every question was answered wrong the first message is displayed
  // Otherwise the number right they got is displayed
    function endOfQuiz(){
        if(questionNum>=allQuestions.length){
          document.getElementById('back').style.display = 'none';
          document.getElementById('start').style.display = 'none';
          var counts = {};
          for(var i = 0; i< answerArray.length; i++) {
            var num = answerArray[i];
            counts[num] = counts[num] ? counts[num]+1 : 1;
          }
          if( counts[0] === allQuestions.length){
            para.textContent = "Ah bad luck you got 0 out of "+ allQuestions.length + " right. Better Luck next time!";
          }else{
          para.textContent = "Awesome you got " + counts[1] + " out of " + allQuestions.length + " right!";}
        }
      }


  //Create the back button and hide it for question 1
    // var backButton = document.createElement('BUTTON');
    // backButton.id = "back";
    // backButton.textContent = "Back";
    // if(backButton){
    // document.getElementById('para1').appendChild(backButton);}
    // document.getElementById('back').style.display = 'none';

  //Display back for any question after question 1
    if(questionNum !== 0){
      document.getElementById('back').style.display = 'block';
    }else{
      document.getElementById('back').style.display = 'none';
    }
    console.log(questionNum);

  //Create the next button
    // var nextButton = document.createElement('BUTTON');
    // nextButton.id = "next";
    // nextButton.textContent = "Next";
    // document.getElementById('para1').appendChild(nextButton);

  //Hide the next button on the last question
    if(questionNum  === allQuestions.length -1){
      document.getElementById('start').textContent = "Submit Anwsers";
    }

  //Assigns these to their functions
  document.getElementById('back').onclick = goBack;
  // document.getElementById('next').onclick = goForward;

  //Takes you back a question, alerts if you're on the first question
  //Otherwise is -1 from questionNum to make sure that stays correct
  //it also takes the last answer out of the answerArray to make sure
  // you can't answer a question twice and get 2 points
    function goBack(){
      if(questionNum === 0){
        alert("This is the first question!");
      }else{
      questionNum = questionNum - 1;
      startQuiz();
      answerArray.pop();}
    }

  //Does the same as the goBack function expect for the next question
  //validates if you're on the last question, adds to the questionNum
    function goForward(){
      if(questionNum === allQuestions.length-1){
        alert("This is the last question!");
      }else{
      questionNum + 1;
      checkAnswer()
      startQuiz();
      }
    }

  //This checks that a radio button is selected.
    function checkAnswerSelected(){
      var element = document.forms.radioContainer.elements.choice;
      var length=element.length-1;
      checkvalue='';
      for(i=0; i<=length; i++){
        if(element[i].checked){checkvalue=element[i].value};
      }
      if(checkvalue===''){
        alert('No button checked.');
        return false;
      }
      return true;
    }
  }
};
