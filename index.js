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
   <button class="button" id="donate">Donation KES200</button>
   <br>
 <label>Reason To set Free</label>
    <br>
    <textarea></textarea>
    <br>
    <button class ="button" id="set_free">Set Free</button>

    </form>
    </div>
    `

 //Add an event listener to every donate button which will be used during updating the donations
    card.querySelector("#donate").addEventListener("click",() =>console.log('click'))


    //add the animal card to the Dom
    document.querySelector('#animal-list').appendChild(card)

    
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



 


 function intialize(){
    getAnimals()
    //BigFive.forEach(animal =>renderAnAnimal(animal))
 }
 intialize()