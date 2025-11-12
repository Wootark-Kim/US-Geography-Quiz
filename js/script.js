//Global variables
var score = 0;
var attempts = localStorage.getItem("total_attempts");
var slider = document.getElementById("q10");
var output = document.getElementById("sliderValue");

//Event listeners
document.querySelector("button").addEventListener("click", gradeQuiz);
slider.addEventListener("input", () => {output.textContent = slider.value;});


displayQ4Choices();
displayQ8Choices();

//Functions
function displayQ4Choices(){
	let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
	q4ChoicesArray = _.shuffle(q4ChoicesArray);
	for (let i=0; i<q4ChoicesArray.length; i++) {
		document.querySelector("#q4Choices").innerHTML += `<input type="radio" name="q4" id= "${q4ChoicesArray[i]}" 
		value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`;
	}
}

function displayQ8Choices(){
	let q8ChoicesArray = ["My Lyell", "Shenandoah Mt", "Kings Mt", "Mt Mauna Kea"];
	q8ChoicesArray = _.shuffle(q8ChoicesArray);
	for (let i=0; i<q8ChoicesArray.length; i++) {
		document.querySelector("#q8Choices").innerHTML += `<input type="radio" name="q8" id= "${q8ChoicesArray[i]}" 
		value="${q8ChoicesArray[i]}"> <label for="${q8ChoicesArray[i]}"> ${q8ChoicesArray[i]}</label>`;
	}
}

function isFormValid(){
	let isValid = true;
	if (document.querySelector("#q1").value == ""){
		isValid = false;
		document.querySelector("#validationFdbk").innerHTML = "Question 1 was not answered";
		return isValid;
	}

	if (!document.querySelector("input[name=q4]:checked")){
		isValid = false;
		document.querySelector("#validationFdbk").innerHTML = "Question 4 was not answered";
		return isValid;
	}

	if (!document.querySelector("input[name=q8]:checked")){
		isValid = false;
		document.querySelector("#validationFdbk").innerHTML = "Question 8 was not answered";
	}

	return isValid;
}

function rightAnswer(index){
	document.querySelector(`#q${index}Feedback`).innerHTML="Correct!";
	document.querySelector(`#q${index}Feedback`).className="bg-success text-white";
	document.querySelector(`#markImg${index}`).innerHTML="<img src='img/checkmark.png'>";
	score += 10;
}

function wrongAnswer(index){
	document.querySelector(`#q${index}Feedback`).innerHTML="Incorrect!";
	document.querySelector(`#q${index}Feedback`).className="bg-warning text-white";
	document.querySelector(`#markImg${index}`).innerHTML="<img src='img/xmark.png' alt='xmark'>";
}

function scoreBar(){
	let totalPossibleScore = 100;
	let progressPercent = (score/totalPossibleScore) * 100;
	let scoreBar = document.querySelector("#percentageBar")
	scoreBar.style.width = progressPercent + "%";
	scoreBar.innerHTML = Math.round(progressPercent)+"%"
	scoreBar.setAttribute("aria-valuenow", progressPercent);
}

function gradeQuiz(){
	console.log("Grading quiz...");
	document.querySelector("#validationFdbk").innerHTML="";
	if (!isFormValid()) {
		return;
	}

	//variables
	score = 0;
	let q1Response = document.querySelector("#q1").value.toLowerCase();
	let q2Response = document.querySelector("#q2").value;
	let q4Response = document.querySelector("input[name=q4]:checked").value;
	let q5Response = document.querySelector("#q5").value.toLowerCase();
	let q6Response = document.querySelector("#q6").value;
	let q8Response = document.querySelector("input[name=q8]:checked").value;
	let q9Response = document.querySelector("#q9").value.toLowerCase();
	let q10Response = document.querySelector("#q10").value;
	console.log(q1Response);
	console.log(q2Response);

	//Grading question 1 ======================================================================
	if (q1Response == "sacramento"){
		rightAnswer(1);
	}

	else {
		wrongAnswer(1);
	}

	//Grading question 2 ======================================================================
	if (q2Response == "mo"){
		rightAnswer(2);
	}

	else {
		wrongAnswer(2);
	}

	//Grading question 3 ======================================================================
	if (document.querySelector("#Jefferson").checked && 
	    document.querySelector("#Roosevelt").checked && 
	   !document.querySelector("#Jackson").checked &&
	   !document.querySelector("#Franklin").checked) {
		rightAnswer(3);
	}
	else{
		wrongAnswer(3);
	}

	//Grading question 4 ======================================================================
	if (q4Response == "Rhode Island") {
		rightAnswer(4);
	} else {
		wrongAnswer(4);
	}

	//Grading question 5 ======================================================================
	if (q5Response == "alaska"){
		rightAnswer(5);
	}

	else {
		wrongAnswer(5);
	}

	//Grading question 6 ======================================================================
	if (q6Response == "Reno, NV"){
		rightAnswer(6);
	}

	else {
		wrongAnswer(6);
	}

	//Grading question 7 ======================================================================
	if (document.querySelector("#Florida").checked && 
		!document.querySelector("#Louisiana").checked && 
		!document.querySelector("#Mississippi").checked &&
		!document.querySelector("#SouthCarolina").checked) {
		rightAnswer(7);
	}
	else{
		wrongAnswer(7);
	}

	//Grading question 8 ======================================================================
	if (q8Response == "Mt Mauna Kea") {
		rightAnswer(8);
	} else {
		wrongAnswer(8);
	}

	//Grading question 9 ======================================================================
	if (q9Response == "nebraska"){
		rightAnswer(9);
	}

	else {
		wrongAnswer(9);
	}

	//Grading question 10 ======================================================================
	// if (document.querySelector("#Pacific").checked && 
	//     document.querySelector("#Atlantic").checked && 
	//     document.querySelector("#Artic").checked &&
	//    !document.querySelector("#Indian").checked) {
	// 	rightAnswer(10);
	// }
	// else{
	// 	wrongAnswer(10);
	// }

	if (q10Response == 3){
		rightAnswer(10);
	}
	else{
		wrongAnswer(10);
	}
	//=========================================================================================

	document.querySelector("#totalScore").innerHTML=`Total Score: ${score}`;

	document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
	localStorage.setItem("total_attempts", attempts);

	if (score >= 80){
		document.querySelector("#finalFeedback").innerHTML = "Congratulations! You scored 80 or above!"
	}
	else {
		document.querySelector("#finalFeedback").innerHTML = "";
	}

	document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
	scoreBar()
}

