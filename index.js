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
   KES <span class ="donation-count">${animal.donation}</span>Donated
   <p>
   <p>${animal.fact}</p>
   </div>
   <br>
   <form>
   <label>Your Name</label>
   <br>
   <input type="text">
   
   <button class="button">Donation KES200</button>
   <br>
    </form>
    <form>
    <br>
    <label>Reason To set Free</label>
    <textarea></textarea>
    <br>
    <button class ="button">Set Free</button>

    </form>
    </div>
    `
    //add the animal card to the Dom
    document.querySelector('#animal-list').appendChild(card)

    
}

//Function to fetch data from BigFive
 function getAnimals(){
  fetch('http://localhost:3000/BigFive')
  .then(res =>res.json())
  .then(BigFive => BigFive.forEach(animal =>renderAnAnimal(animal)))

 }

//  function intialize(){
//     getAnimals()
//     //BigFive.forEach(animal =>renderAnAnimal(animal))
//  }
//  intialize()