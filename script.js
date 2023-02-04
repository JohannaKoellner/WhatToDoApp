let checkedActivities = [];
let shownAcitivies = [];
let counter = 0;

//add event listener to all checkbox elements and push them to checkedActivities array if checked
const checkboxInputs = document.querySelectorAll('.checkbox');
checkboxInputs.forEach(function(checkboxInput){
    checkboxInput.addEventListener('change', () => {
        if (checkboxInput.checked) {
            checkedActivities.push(checkboxInput.id);
            console.log(checkedActivities);
            shownAcitivies = [];
            counter = 0;
        }
        else {
            //remove unchecked activity from checkedActivities array
            const actIndex = checkedActivities.indexOf(checkboxInput.id);
            if (actIndex >= 0) { // only remove if item was found in array
                checkedActivities.splice(actIndex, 1); // splice at index and remove 1 item
            }
            shownAcitivies = [];
            counter = 0;
        }})
})

//add event listener to participants
let participants=1;
const participantInput = document.querySelector('#participants');
participantInput.addEventListener('change', () => {
    participants = participantInput.value;
    console.log(`participants: ${participants}`);
    shownAcitivies = [];
})


//start function
function giveSuggestion() {

    //shuffle checkedActivities array
    checkedActivities.sort(() => Math.random() - 0.5);
    console.log(`checkedActivities array is ${checkedActivities}`);

    fetchSuggestion();  
};


//async for of function
async function fetchSuggestion(){
    for await (const element of checkedActivities) {
        const url = `https://www.boredapi.com/api/activity?type=${element}&participants=${participants}`;

        //fetch the data
        let response = await fetch(url);
        let suggestion = await response.json();

        //check if an activity was found
        if (suggestion.activity === undefined) {
            console.log(suggestion.activity);
            console.log(`activity ${element} returned undefined`);

            //check if this is the last element in the array of interests
            if (element === checkedActivities[checkedActivities.length - 1]) {
                console.log(`the last element in the array is ${element}`);
                document.getElementById("suggested-activity").innerHTML = `No activities matching your preferences found`;
            }
        }
        
        else if (shownAcitivies.includes(suggestion.activity)) {
                counter++;
                if (counter === 1) {
                    document.getElementById("suggested-activity").innerHTML = '👩🏻‍💻 Hmm... 💭';
                    break
                }
                else if (counter === 2) {
                    document.getElementById("suggested-activity").innerHTML = '👩🏻‍💻 Let me pick my brain for some more ideas... 🤔';
                    break
                }
                else if (counter === 3) {
                    document.getElementById("suggested-activity").innerHTML = `👩🏻‍💻 It's not that easy with all your requirements! 😑`;
                    break
                }
                else if (counter === 4) {
                    document.getElementById("suggested-activity").innerHTML = `👩🏻‍💻 Okok, maybe I have one more...`;
                    break
                }
                else if (counter === 5) {
                    document.getElementById("suggested-activity").innerHTML = `👩🏻‍💻 OMG you must be really bored... 😤`;
                    break
                }
                else {
                    document.getElementById("suggested-activity").innerHTML = '👩🏻‍💻 JUST THINK FOR YOUSELF!! 🤬';
                    break
                }
            }

        else {
            shownAcitivies.push(suggestion.activity);
            document.getElementById("suggested-activity").innerHTML = suggestion.activity;
            console.log(`the used activity is: ${element}`);
            console.log(`shownActivities = [${shownAcitivies}]`);
            break
        }
        
    }
}
