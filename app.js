/*
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((response) => response.json())
  .then((json) => console.log(json));
*/


/*
fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((json) => console.log(json));
*/

let getAllPost = function(url){
    return new Promise(function(resolve, reject){
        var request = new XMLHttpRequest()
        request.open('GET', url)
        request.responseType = 'json'
        request.onload = function(){
            if(request.status == 200){
                resolve(request.response)
            }
            else{
                reject(Error('json couldn not be loaded. Error: ' + request.statusText))
            }
        }
        request.onerror = function(){
            reject(Error('network lost'))
        }
        request.send()
    })
}

getAllPost('https://jsonplaceholder.typicode.com/posts')
    .then((response)=>{
        //console.log(response);
        response.forEach(post => {
           // console.log("Title: " + post.title);
            
        });
    })
    .catch((error)=>{
        console.log(error);
    })

function createAddressUserDOM(address){

    //console.log("Address \n\n" + address.street);
    //const [street, suite, city, geo, zipcode] = address

    let div = document.createElement("div")
    div.setAttribute("class", "address-info")
    let pStreet = document.createElement("p")
    pStreet.innerHTML = address.street;
    let pSuite = document.createElement("p")
    pSuite.innerHTML = address.suite;
    let pCity = document.createElement("p")
    pCity.innerHTML = address.city;
    let pZipcode = document.createElement("p")
    pZipcode.innerHTML = address.zipcode;
    let geoLat = document.createElement("p")
    geoLat.innerHTML = address.geo.lat;
    let geoLng = document.createElement("p")
    geoLng.innerHTML = address.geo.lng;

    div.appendChild(pCity)
    div.appendChild(pStreet)
    div.appendChild(pSuite)
    div.appendChild(pZipcode)
    div.appendChild(geoLat)
    div.appendChild(geoLng)

    return div;
}

function createCompanyUserDOM(company){
    //const [bs, catchPhrase, name] = company

    let div = document.createElement("div")
    div.setAttribute("class", "company-info")
    let pName = document.createElement("p")
    pName.innerHTML = company.name;
    let pCatchPhrase = document.createElement("p")
    pCatchPhrase.innerHTML = company.catchPhrase;
    let pBs = document.createElement("p")
    pBs.innerHTML = company.bs;

    div.appendChild(pName)
    div.appendChild(pCatchPhrase)
    div.appendChild(pBs)
    return div;
}

function createUserDOM(user){

    let adress = createAddressUserDOM(user.address)
    let company = createCompanyUserDOM(user.company)

    let div = document.createElement("div")
    div.setAttribute("class", "user-info")
    let pName = document.createElement("p")
    pName.innerHTML = user.name;
    let pEmail = document.createElement("p")
    pEmail.innerHTML = user.email;
    let pUsername = document.createElement("p")
    pUsername.innerHTML = user.username;
    let pPhone = document.createElement("p")
    pPhone.innerHTML = user.phone;
    let pWebsite = document.createElement("p")
    pWebsite.innerHTML = user.website;
    let pID= document.createElement("p")
    pID.innerHTML = "ID: " + user.id;

    div.appendChild(pName)
    div.appendChild(pEmail)
    div.appendChild(pPhone)
    div.appendChild(pWebsite)
    div.appendChild(pID)
    div.appendChild(adress)
    div.appendChild(company)
    return div;
}

function addUserDOM(user){
    let userList = document.getElementById("users-list")
    let userDOM = createUserDOM(user)
    userList.append(userDOM)
}

function addUserTable(user){

    let tr = document.createElement("tr")

    let tdName = document.createElement("td")
    tdName.innerHTML = user.name
    tr.appendChild(tdName)

    let tdUsername = document.createElement("td")
    tdUsername.innerHTML = user.username
    tr.appendChild(tdUsername)

    let tdEmail= document.createElement("td")
    tdEmail.innerHTML = user.email
    tr.appendChild(tdEmail)

    let tdPhone = document.createElement("td")
    tdPhone.innerHTML = user.phone
    tr.appendChild(tdPhone)

    let tdWesite = document.createElement("td")
    tdWesite.innerHTML = user.website
    tr.appendChild(tdWesite)

    let tdID = document.createElement("td")
    tdID.innerHTML = user.id
    tr.appendChild(tdID)

    tbody = document.getElementById("users")
    tbody.append(tr)
}


let getAllUsers = function(url){
    return new Promise(function(resolve, reject){
        var request = new XMLHttpRequest()
        request.open('GET', url)
        request.responseType = "json"
        request.onload = function (){
            if(request.status == 200){
                resolve(request.response)
            }
            else{
                reject(Error("problem to get users. Error: " + request.statusText))
            }
        }
        request.onerror = function(){
            reject(Error("problem network"))
        }
        request.send()
    })
}

const arrayUsers = []

getAllUsers('https://jsonplaceholder.typicode.com/users')
    .then((response)=>{
        //console.log(response);
        response.forEach(user =>{
            //console.log(user.address);
            arrayUsers.push(user)
            addUserTable(user)
            addUserDOM(user)

        })
        
    })
    .catch((error)=>{
        console.log(error);
    })

console.log( arrayUsers);

let newUser = {
    id: 98, // es opcional el servidor asigna uno
    name: "Alex Echeverria",
    username: "alexx_echev",
    email: "aleex.naahuel@outlook.com",
    address: {
        city: "Mar del Plata",
        geo: {lat: '-37.3159', lng: '81.1496'},
        street: "Cerrito",
        suite : "Apt. 666",
        zipcode:"92998-3874"
    },
    company: {
        bs: "harness real-time e-markets",
        catchPhrase: "Is technology, is innovation",
        name: "TECHeverriarg"
    },
    phone: "223456776",
    website: "www.alex.com"
}

let postNewUser = function(newUser, url){
    return new Promise(function(resolve, reject){
        var request = new XMLHttpRequest()
        request.open("POST", url)
        request.setRequestHeader("Content-Type", "application/json")
        request.responseType = "json"
        
        request.onload = function(){
            if(request.status == 201){
                resolve(request.response)
            }
            else{
                reject(Error("Cannot register new user. " + request.statusText))
            }
        }
        request.onerror = function(){
            reject(Error("a problem to register new user"))
        }
        request.send(JSON.stringify(newUser))
    })
}


postNewUser(newUser, 'https://jsonplaceholder.typicode.com/users')
    .then((response)=>{
        console.log("Post user");
        console.log(response);
        arrayUsers.push(response)
        console.log("eso fue la respuesta del servidor ahora muestro el array");
        console.log(arrayUsers);
    })
    .catch((error)=>{
        console.log("erorr" + error);
    })



/*
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));


  fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PUT',
  body: JSON.stringify({
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
*/