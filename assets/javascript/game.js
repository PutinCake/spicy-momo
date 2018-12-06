//======================Questions=======================================
var triviaQuestions = [
    {
    question: "To what country is the mung bean native?",
    answerList: ["Ireland", "Indonesia", "China", "India"], 
    answer: 3
},{
    question: "In what country would you find shish kebab as an everyday food?",
    answerList: ["Palau", "China", "Turkey", "Chile"],
    answer: 2
},{
    question: "What country is renowned for chocolate?",
    answerList: ["Venezuela", "Argentina", "Belgium", "Finland"],
    answer: 2
},{
    question: "In what country might you eat haggis?",
    answerList: ["Scotland", "Norway", "Paraguay", "Lesotho"],
    answer: 3
},{
    question: "What country does the word 'mocha' come from?",
    answerList: ["Saudi Arabia", "Yemen", "Tonga", "Pakistan"],
    answer: 1
}
];
//========================create variables============================
var questionNum;
var correctAnswer;
var incorrectAnswer;
var unanswered; 
var seconds;
var time;
var playerSelect;
var messages = {
	correct: "Good job!",
	incorrect: "Foorom it!",
	endTime: "One more time~",
	finished: "Let's Foorom your favorite food!"
}

//=========================set start btn & restart btn===================
$("#startBtn").on("click", function(){
	$(this).hide();
	newGame();
});

$("#restart").on("click", function(){
 	$(this).hide();
 	newGame();
 });

 //========================New Game setting=============================
function newGame(){
	questionNum = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	$("#finishMessage").empty();
	$("#correctAnswers").empty();
	$("#incorrectAnswers").empty();
	$("#unanswered").empty();
	newQuestion();
}

//==================New Game function==============================
function newQuestion(){
	
	$("#message").empty();
	$("#correctedAnswer").empty();
	$("#gif").empty();
	answered = true;
//==================setting up questions==========================
	$(".question").html("<h2>" + triviaQuestions[questionNum].question + "</h2>");
	//==========================answer options===================================
	for(var i = 0; i < 4; i++){
		var choices = $("<div>");
		choices.text(triviaQuestions[questionNum].answerList[i]);
		choices.addClass("thisChoice");
		choices.attr({"data-index": i });
		$(".answerList").append(choices);
	}

	countdown();

	$(".thisChoice").on("click",function(){
		playerSelect = $(this).data("index");
		clearInterval(time);
		answerPage();
	});
}
//========================countdown section==============================
function countdown(){
	seconds = 20;
	$("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
	answered = true;
	time = setInterval(startCountdown, 1000);
}
//==========================start countdown==================================
function startCountdown(){
	seconds--;
	$("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$(".thisChoice").empty(); 
	$(".question").empty();
//========set up standard======================================================
	var correctAnswerText = triviaQuestions[questionNum].answerList[triviaQuestions[questionNum].answer];
	var correctAnswerIndex = triviaQuestions[questionNum].answer;

	if(questionNum == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 4000);
	} else{
		questionNum++;
		setTimeout(newQuestion, 4000);
	}	
	
//==========================Checking answers is correct or incorrect==================
	if((playerSelect == correctAnswerIndex) && (answered == true)){
		correctAnswer++;
		$("#message").html(messages.correct);
	} else if((playerSelect != correctAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$("#message").html(messages.incorrect);
		$("#correctedAnswer").html("The correct answer was: " + correctAnswerText);
	} else{
		unanswered++;
		$("#message").html(messages.endTime);
		$("#correctedAnswer").html("The correct answer was: " + correctAnswerText);
		answered = true;
	}
	
}

//========================show final page========================================
function scoreboard(){
	$("#finishMessage").html(messages.finished);
	$("#correctAnswers").html("Correct Answers: " + correctAnswer);
	$("#incorrectAnswers").html("Incorrect Answers: " + incorrectAnswer);
	$("#unanswered").html("Unanswered: " + unanswered);
	$("#restart").addClass("reset");
	$("#restart").show();
	$("#restart").html("Don't let me dowm!");
	//====================================clean data==============================
	$("#timeLeft").empty();
	$("#message").empty();
	$("#correctedAnswer").empty();

}