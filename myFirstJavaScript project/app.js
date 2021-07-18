
    const clock = () => {
        const date = new Date(); //Date method
        let hours = date.getHours();  //Hour method
        let minutes = date.getMinutes();//Date method
        let seconds = date.getSeconds();//Second method
        let AmPm = date.getHours(); 
        
        //ClockRules
    
        if(hours <= 9){
            hours = '0'+ hours;
        }
         if(minutes <= 9){
            minutes = '0'+ minutes;
        }
        if(seconds <= 9){
           seconds = '0'+ seconds;
        }
        
  
          if(AmPm >= 12){
            AmPm = "PM";
        } else{
            AmPm = "AM";
        }
    
    
    
        ///For Clock widget
        document.getElementById('hour').innerHTML = hours;
      document.getElementById('min').innerHTML = minutes;
         document.getElementById('sec').innerHTML = seconds;
           document.getElementById('AmPm').innerHTML = AmPm;
    }
 setInterval(clock, 1000);   ///Call the function and timing


    const dayMonthYear = function(){
    const date = new Date()


    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    
    let day2 = date.getDay();

    if(day2===0){
        day2 = "Sunday";
    }else if(day2 ===1){
        day2 = "Monday";
    }else if(day2 ===2){
        day2 = "Tuesday";
    }else if(day2 ===3){
        day2 = "Wednesday";
    }else if(day2 ===4){
        day2 = "Thursday";
    }else if(day2 ===5){
        day2 = "Friday";
    }else if(day2 ===6){
        day2 = "Saturday";
    }

    document.getElementById('dayofweek').innerHTML = day2;
    document.getElementById('day').innerHTML = day;
    document.getElementById('month').innerHTML = month;
    document.getElementById('year').innerHTML = year;
    


    
    }
 setInterval(dayMonthYear, 1000);   ///Call the function and timing
    // calling the clock function after each second(1000ms).
    
    
    
    ///////////////////////////////////////////////////////WeatherWidget///////////////////////////////////////////////////////////
    
    //First sectin to get co-ordinates and pass them into function
    
    let gotPosition = function(pos) {
                let lat = pos.coords.latitude;
                let long = pos.coords.longitude;
                 console.log(lat);
                console.log(long);
                getForecast(lat, long);
            }
            let getForecast = function(lat, long) {
                let url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=current,minutely,hourly&appid=b4df2c33c23268abc841acd25b689f0c";
                getWeatherText(url);
            }
    //Async Function 
            async function getWeatherText(url) {
                let weatherObject = await fetch(url);
                let weatherText = await weatherObject.text();
                console.log(weatherObject);
                console.log(weatherText);
                parseWeather(weatherText);
            }
    //JSOn conversion and node grabbing
            let parseWeather = function(weatherText) {
                let weatherJSON = JSON.parse(weatherText);
                console.log(weatherJSON)
                let dailyForecast = weatherJSON.daily;
                console.log(dailyForecast)
                //console.log(dailyForecast);
    
    
    
    
    
    
    
                for (x = 0; x < dailyForecast.length; x++) {
                    let day = dailyForecast[x];
                    let today = new Date().getDay() + x;
                    console.log(today)
                    // if(x === 8 ){
                    //     break;
                    
                    if (today > 6) {
                        today = today - 7;
                        
                    }
                   
            
                    let dayOfWeek = getDayOfWeek(today);
                    let description = day.weather[0].description;
                    let icon = day.weather[0].icon;
                    let highTemp = kToC(day.temp.max);
                    let lowTemp = kToC(day.temp.min);
                   
                    displayWeatherDay(dayOfWeek, description, icon,  highTemp, lowTemp, );
                   
                    
                   
                }
            }        
            let getDayOfWeek = function(dayNum) {
                var weekday = new Array(7);
                weekday[0] = "Sun";
                weekday[1] = "Mon";
                weekday[2] = "Tues";
                weekday[3] = "Wed";
                weekday[4] = "Thurs";
                weekday[5] = "Fri";
                weekday[6] = "Sat";
    
                return (weekday[dayNum]);
            }

    //Actual display Part of info
            let displayWeatherDay = function(dayOfWeek, description, icon,  highTemp, lowTemp, ) {
                let out = "<div class='weatherDay'><img src='http://openweathermap.org/img/wn/" + icon + ".png'/>";
                out += "<h3>" + dayOfWeek + "</h3>";
                out += "<h4>" + description + "</h4>";
              
                out += "<h5><span class = 'span1' >High:</span> " + highTemp + "c</h5>";
                out += "<h6><span class = 'span2'>Low:</span> " + lowTemp + "c</h6>";
            
                document.getElementById("forecast").innerHTML += out;
                document.getElementById("forecast").style.fontSize = "20px";
            
                
            }


            let kToC = function(kelvinTemp) {
                const celsius = kelvinTemp - 273;
                const c = Math.floor(celsius);
                return c
            }

            let timestampToTime = function(timeStamp) {
                let date = new Date(timeStamp * 1000);
                let hours = date.getHours();
                let minutes = "";
                if (date.getMinutes() < 10) {
                    minutes = "0" + date.getMinutes();
                } else {
                    minutes = date.getMinutes();
                }
                return hours + ":" + minutes;
            }
        
            navigator.geolocation.getCurrentPosition(gotPosition);

            
        
    ////////////////////////////////////////////////////////////
    
    
    
    
    
    
            const todoInput = document.querySelector('.todo-input');
    const todoButton = document.querySelector('.todo-button');
    const todoList = document.querySelector('.todo-list');
    
    //Event listeners
    
    todoButton.addEventListener("click", addTodo);
    todoList.addEventListener("click", deleteCheck);
   
    //functions
    function deleteCheck(e){
        const item = e.target;
       
        if(item.classList[0] === "trash-btn"){//if true
            const todo = item.parentElement;//const todo = TodoDiv
            todo.classList.add("fall");//adds classlist
            todo.addEventListener('transitionend', function(){//listens for end of transition
                todo.remove(); //DELETE TODO/
            })
        }

        
        if(item.classList[0] === "complete-btn"){//if true
            const todo = item.parentElement;//const todo = TodoDiv
            todo.classList.toggle('completed');//check Mark
        }
    }
    


    function addTodo(event){
        
        event.preventDefault() ///PREVENT from submitting/Because form default is to submit
        
        
        const todoDiv = document.createElement('div');//CREATE: Todo Div --The main div 
        todoDiv.classList.add('todo');//ADDCLASS to: Todo Div
    
        const newTodo = document.createElement('li');///Create <li></li>
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');//ADDCLASS to: newTodo  <"li">
        todoDiv.appendChild(newTodo)//APPEND to  todoDIV, Sticks the li in the div
    
        const completedButton = document.createElement('button');  //CheckMark Button
        completedButton.innerHTML = '<i class="fas fa-check"></i>';//
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
    
        const trashButton = document.createElement('button');//CHECK trash Button
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';//ADDImage: Checked Button
        trashButton.classList.add('trash-btn');//Adds Class
        todoDiv.appendChild(trashButton); //append to list
      
       
    
       todoList.appendChild(todoDiv)
    //Clear todo Input Value
    todoInput.value = "";
    
    
    
    }

    ///////////////////



    
    
    
    const todoInput2 = document.querySelector('.todo-input2');
    const todoInput3 = document.querySelector('.todo-input3');
    const todoButton2 = document.querySelector('.todo-button2');
    const todoList2 = document.querySelector('.todo-list2');
    const budget = document.querySelector('.selectMe')
    const balance = document.querySelector('.selectMe2')
    const todoInput1 = document.querySelector('.todo-input1')
    const buttonbudget = document.querySelector('.todo-button1')
   const balanceF = document.querySelector(".selectMe2");
    
    //Event listeners
    
    todoButton2.addEventListener("click", addTodo2);
    todoList2.addEventListener("click", deleteCheck2);
    buttonbudget.addEventListener("click", addBudget);
    todoButton2.addEventListener("click", addBalance);
   
    //functions
    function deleteCheck2(e){
        const item = e.target;
       
        if(item.classList[0] === "trash-btn"){//if true
            const todo2 = item.parentElement;//const todo = TodoDiv
            todo2.classList.add("fall");//adds classlist
            todo2.addEventListener('transitionend', function(){//listens for end of transition
                todo2.remove(); //DELETE TODO/
                balanceF.innerText = balanceF.innerText- newTodo2.match(/(\d+)/);

            })
        }

        
        if(item.classList[0] === "complete-btn"){//if true
            const todo2 = item.parentElement;//const todo = TodoDiv
            todo2.classList.toggle('completed');//check Mark
        }

        if(item.classList[0] === "trash-btn"){
        balanceF.innerText = balanceF.innerText- newTodo2.match(/(\d+)/);
        }

    }



    


    function addTodo2(event){
        
        event.preventDefault() ///PREVENT from submitting/Because form default is to submit
        
        
        const todoDiv2 = document.createElement('li');//CREATE: Todo Div --The main div 
        todoDiv2.classList.add('todo2');//ADDCLASS to: Todo Div
        const newTodo2 = document.createElement('li');///Create <li></li>
        newTodo2.innerText = todoInput2.value+  " " + todoInput3.value + ".00 Fjd";
        newTodo2.classList.add('todo-item');//ADDCLASS to: newTodo  <"li">
        todoDiv2.appendChild(newTodo2)//APPEND to  todoDIV, Sticks the li in the div
    
        const completedButton2 = document.createElement('button');  //CheckMark Button
        completedButton2.innerHTML = '<i class="fas fa-check"></i>';//
        completedButton2.classList.add('complete-btn');
        todoDiv2.appendChild(completedButton2);
    
        const trashButton2 = document.createElement('button');//CHECK trash Button
        trashButton2.innerHTML = '<i class="fas fa-trash"></i>';//ADDImage: Checked Button
        trashButton2.classList.add('trash-btn');//Adds Class
        todoDiv2.appendChild(trashButton2); //append to list
      
        if(todoInput2.value==""){
            alert("Empty space");
            delete todoInput2;
            todo2.remove();
            
        }
        if(todoInput3.value==""){
            alert("Empty space");
            delete todoInput2;
            todo2.remove();
            
        }
    
       todoList2.appendChild(todoDiv2)
    //Clear todo Input Value
    todoInput2.value = "";
    todoInput3.value = "";
    
    
    
    

    
    function addBudget(event){
        event.preventDefault() 
        const budget1 = document.querySelector(".selectMe");
        budget1.innerText= todoInput1.value + "Fjd";
        budget1.classList.add('budget1');
        todoInput1.value = "";
        
    }

    function addBalance(event){
        event.preventDefault()
        const balanceF = document.querySelector(".selectMe2");
        balanceF.innerText = Number(balanceF.innerText) + Number(todoInput3.value);
        budget1.classList.add('budget2');
        todoInput3.value = "";
    }
}


let  x = function(breakme){
    console.log("Testign 12 testing 12")
}