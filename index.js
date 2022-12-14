//Intial call

function renderAnAnimal(animal) {
    //Making a card for an animal
    let card = document.createElemnt('li')
    card.className='card'
    card.innerHTML =`
    <img src="${animal.image}">
    <div class= "content">
    <h4>${animal.name}</h4>
    <p>
   KES <span class ="donation-count">${animal.donation}</span>Dpnated
   <p>
   <p>${animal.fact}</p>
   </div>
   <form>
   <label>Your Name</label>
   <input type="text" >
   <button class="button">Donation KES200</button>
    </form>
    <form>
    <label>Reason To set Free</label>
    <textarea></textarea>
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

 }