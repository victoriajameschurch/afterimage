const questions = [

    // MEMORY
    "What is the smallest moment you remember vividly?",
    "What smell instantly takes you somewhere else?",
    "What sound brings back a memory you haven't thought about in years?",
    "What is a memory you don't know why you still remember?",
    "What place do you remember more clearly than you remember the people there?",
    "What is something you remember differently from everyone else?",
    "What memory would you preserve if you could?",
    "What ordinary object carries an unexpected memory?",

    // CONSCIOUSNESS
    "What makes you feel certain that you are conscious?",
    "If your memories were completely erased, would you still be the same person?",
    "How do you know that other people experience consciousness the way you do?",
    "If a perfect copy of your mind were created, which one would be you?",
    "Where do you think a thought begins?",
    "Do you think consciousness is something the brain produces, or something we don't yet understand?",
    "What makes a person the same person from childhood to adulthood?",

    // TIME
    "Why does a year feel shorter when you're older?",
    "Do you think the past still exists somewhere, or only in our memories?",
    "Why does waiting for something make time feel slower?",
    "Is the present actually a moment, or is it something our brains construct?",

    // SPACE
    "If you could travel anywhere in the universe, where would you go?",
    "What do you think it would feel like to look at Earth from another planet?",
    "If we discovered intelligent life somewhere else, what would you want to ask first?",
    "Do you think there are other people somewhere in the universe looking at their own night sky?",
    "If humanity could only send one message into space, what should it say?",
    "Would discovering extraterrestrial life change how you think about humanity?",
    "What do you think is more unsettling: an infinite universe or a finite one?",
    "If you could see the universe from the outside, what do you imagine it would look like?",

    // PHILOSOPHY
    "What makes something meaningful?",
    "Is a life still meaningful if nobody remembers it?",
    "Would you rather know the truth about everything or keep some mysteries?",
    "Can something be real if nobody can observe it?",
    "What do you think makes a good life?",
    "Is being remembered important, or is experiencing life enough?",
    "Do humans discover meaning, or do we create it?",

    // PERCEPTION
    "How much of reality do you think your brain hides from you?",
    "If everyone experiences color differently but calls colors by the same names, how would we know?",
    "Why do some moments feel strangely familiar even when we've never experienced them before?",
    "How much of what you remember do you think is actually what happened?",
    "If your brain can create dreams that feel completely real, what makes waking life different?",
    "What would you want to know about the way your own brain works?",

    // EXISTENCE
    "What do you think the universe looked like before there were stars?",
    "If humans could remember every moment of their lives perfectly, would that be a gift or a burden?",
    "If you could ask the universe one question and receive a completely truthful answer, what would you ask?",
    "If you could experience another person's consciousness for one minute, what would you want to understand?",
    "What do you think humans will understand about consciousness 500 years from now?",
    "If humanity disappeared tomorrow, what evidence would you want us to leave behind?",
    "What is something about existence that you think humans may never understand?"

];


// Pick a random question
const randomIndex = Math.floor(Math.random() * questions.length);

const questionElement = document.getElementById("question");

questionElement.textContent = questions[randomIndex];


// Get form elements
const memoryBox = document.getElementById("memory");
const characterCount = document.getElementById("character-count");
const submitButton = document.getElementById("submit-button");
const message = document.getElementById("message");


// Character counter
memoryBox.addEventListener("input", function() {

    characterCount.textContent =
        memoryBox.value.length + " / 2000";

});


// Google Apps Script URL
const scriptURL =
    "https://script.google.com/macros/s/AKfycbwmIdLX70Mb1JCvqwobJS_AErbhvEqbUak6owPqHPvu_CwPnsdFDXyutujTb--d8XM/exec";


// Submit the memory
submitButton.addEventListener("click", async function() {

    const memory = memoryBox.value.trim();

    if (memory === "") {

        message.textContent =
            "Write something before submitting.";

        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "SENDING...";


    const question =
        questionElement.textContent;


    // Put the information into the request URL
    const submissionURL =
        scriptURL +
        "?question=" +
        encodeURIComponent(question) +
        "&memory=" +
        encodeURIComponent(memory);


    try {

        await fetch(submissionURL, {
            method: "POST",
            mode: "no-cors"
        });


        message.textContent =
            "Your memory has been added to the archive.";

        memoryBox.value = "";

        characterCount.textContent =
            "0 / 2000";


    } catch (error) {

        message.textContent =
            "Something went wrong. Please try again.";

        console.error(error);

    }


    submitButton.disabled = false;

    submitButton.textContent =
        "SUBMIT MEMORY →";

});
