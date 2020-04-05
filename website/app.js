    /* Global Variables */
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
    const apiKey = '&appid=df9138493452d1ff1957084c14a6d68a';

    // Create a new date instance dynamically with JS
    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

    // Async GET
    const retrieveData = async (baseURL, userZip, apiKey) => {
        const res = await fetch(`${baseURL}${userZip}${apiKey}`);
        try {
            // Transform into JSON
            const userData = await res.json()
            return userData;
        }
        catch (error) {
            console.log("error", error);
            // appropriately handle the error
        }
    };

    //eventListener for element with ID #generate
    document.getElementById('generate').addEventListener('click', onClick);

    //callback function for the element #generate
    function onClick() {
        const userZip = document.getElementById('zip').value;
        const mood = document.getElementById('feelings').value;

        retrieveData(baseURL, userZip, apiKey)
        .then(function (userData) {
            const apiData = {date: newDate, temp: userData.main.temp, mood};
            console.log(apiData);
                postData('/add', {date: newDate, temp: userData.main.temp, mood})
            }).then(function (newData) {
                updateUI()
            })
    };

    // Async POST
    const postData = async (url = '', data = {}) => {

        const res = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                data
            )
        });

        try {
            const newData = await res.json();
            return newData;
        } catch (error) {
            console.log("error", error);
        }
    };

    // Update UI
    const updateUI = async () => {
        const req = await fetch('/all');
        try {
            const Data = await req.json()
            document.getElementById('date').innerHTML = Data.date;
            document.getElementById('temp').innerHTML = Data.temp;
            document.getElementById('content').innerHTML = Data.userResponse;
        }
        catch (error) {
            console.log("error", error);
        }
    };