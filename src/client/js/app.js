const resetErrorDiv = () => {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.innerHTML = '';
}


const displayMessage = (message) => {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.innerHTML += message;
}

/* Function to POST data to express */
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),      
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    }
};

/* Update the view with information */
const updateUI = async () => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.userFeelings;
    } catch(error) {
        console.log("error", error);
    }
};

const performAction = (e) => {
    e.preventDefault();
    resetErrorDiv();
    let error = false;

    let location =  document.getElementById('location').value;

    let travelDate = document.getElementById('travelDate').value;
    travelDate = new Date(travelDate);

    let currentDate = new Date();
    // let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    let maxForecastDate = new Date();
    maxForecastDate.setDate(currentDate.getDate() +15);


    if (!location) {
        displayMessage('<p>Please enter the city where you are traveling to</p>');
        error = true;
    }

    if (!travelDate) {
        displayMessage('<p>Please enter the travel date</p>');
        error = true;
    } else if (travelDate<currentDate) {
        displayMessage('<p>Please enter the future date</p>');
        error = true;
    } else if (travelDate>maxForecastDate) {
        displayMessage(`<p>You cannot choose the date more than ${maxForecastDate.getMonth()}/${maxForecastDate.getDate()}/${maxForecastDate.getFullYear()}. Please come back minimum two weeks before your departure</p>`);
        error=true;
    }

    if (!error) {
        postData('/sendToApis', {
            date:travelDate, 
            location:location
        }).then(function(data){
            console.log(data);
            
        })
        // .then(function() {
        //     updateUI();
        // });

    }



};

export { displayMessage, postData, updateUI, performAction }
