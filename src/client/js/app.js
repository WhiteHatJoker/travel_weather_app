// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


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
    let zipCode = document.getElementById('zip').value;
    let location =  document.getElementById('location').value;

    postData('/sendToApis', {
        date:newDate, 
        location:location
    }).then(function(data){
        console.log(data);
        
    })
    // .then(function() {
    //     updateUI();
    // });


};

export { postData, updateUI, performAction }
