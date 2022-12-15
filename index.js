//Event Listeners
document.querySelector("#animal-form").addEventListener('submit',
handleSubmit)

//EventHandlers
function handleSubmit(e){
    e.preventDefault()
    let animalObj ={
        animal:e.target.animal.value,
        image:e.target.image.value,
        fact:e.target.fact.value,
        donation: 0
    }
    
    renderAnAnimal(animalObj)
    adoptAnimal(animalObj)
}

//Intial call

function renderAnAnimal(animal) {
    //Making a card for an animal
    let card = document.createElement('li')
    card.className='card'
    card.innerHTML =`
    <img src="${animal.image}">
    <div class= "content">
    <h4>${animal.animal}</h4>
    <p>
   KES<span class ="donation-count">${animal.donation}</span> Donated
   <p>
   <p>${animal.fact}</p>
   </div>
   <br>
   <form>
   <label>Your Name</label>
   <br>
   <input type="text">
   <button class="button" id="donate" type="button" >Donation KES200</button>
   <br>
 <label>Reason To send To a Park</label>
    <br>
    <textarea></textarea>
    <br>
    <button class ="button" id="set_free" type="button">Send to The Park</button>
 <br>
 <br>
    </form>
    </div>
    `

    //add the animal card to the Dom
    document.querySelector('#animal-list').appendChild(card)



 //Add an event listener to every donate button which will be used during updating the donations
 //Increment the donations by 200 everytime it is clicked
    card.querySelector("#donate").addEventListener("click",() =>{
        animal.donation +=200
        card.querySelector('span').textContent =animal.donation



        updateDonation(animal)

    })
//Add event listener to the Send to park button to delete animal from zoo
card.querySelector("#set_free").addEventListener("click",()=>{
    card.innerHTML=''
})


    
}

//Function to fetch data from BigFive
 function getAnimals(){
  fetch('http://localhost:3000/BigFive')
  .then(res =>res.json())
  .then(BigFive => BigFive.forEach(animal =>renderAnAnimal(animal)))

 }
//POST request to add a new animal that is adopted to the zoo through the form

 function adoptAnimal(animalObj){
   
    fetch('http://localhost:3000/BigFive',{
        method:'POST',
        headers:{
           'Content-Type':'application/json' 
        },
        body:JSON.stringify(animalObj)
    })
    .then(res => res.json())
    .then(animal =>console.log(animal) )

 }
 //Patch request to update the donation amount

function updateDonation(animalObj){
    
    fetch(`http://localhost:3000/BigFive/${animalObj.id}`,{
        method:'PATCH',
        header:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(animalObj)

    })
    .then(res =>res.json())
    .then(animal =>console.log(animal))
}
//Delete to be set on set free
 


 function intialize(){
    getAnimals()
    //BigFive.forEach(animal =>renderAnAnimal(animal))
 }
 intialize()


 //Searchbar
 var search = document.createElement('div');
 search.innerHTML = '<input type="text" id="search" placeholder="Search...">';
 document.querySelector('#search').appendChild(search);
 var searchResults = document.createElement('div');
 searchResults.innerHTML = '<ul id="searchResults"></ul>';
 document.body.appendChild(searchResults);
 var search = document.getElementById('search');
 var searchResults = document.getElementById('searchResults');
 search.addEventListener('keyup', function(e) {
   var searchValue = e.target.value;
   var searchResults = document.getElementById('searchResults');
   searchResults.innerHTML = '';
   var searchResultsList = document.createElement('ul');
   searchResults.appendChild(searchResultsList);
   var searchResultsListItem = document.createElement('li');
   searchResultsList.appendChild(searchResultsListItem);
   searchResultsListItem.innerHTML = 'http://localhost:3000/BigFive/${animalObj.animal}' + searchValue ;
 });

