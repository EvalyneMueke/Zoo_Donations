document.addEventListener("DOMContentLoaded", () => {
  //Event Listeners
  document
    .querySelector("#animal-form")
    .addEventListener("submit", handleSubmit);

  //EventHandlers
  function handleSubmit(e) {
    e.preventDefault();
    let animalObj = {
      animal: e.target.animal.value,
      image: e.target.image.value,
      fact: e.target.fact.value,
      donation: 0,
    };

    renderAnAnimal(animalObj);
    adoptAnimal(animalObj);
  }

  //Intial call

  function renderAnAnimal(animal) {
    //Making a card for an animal
    let card = document.createElement("li");
    card.className = "card";
    card.innerHTML = `
    <div class= "content">
    <img src="${animal.image}">
    
    <h4>${animal.animal}</h4>
    <br>
    <p>
   KES<span class ="donation-count">${animal.donation}</span> Donated
   <p>
   <br>
   <p>${animal.fact}</p>
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
    `;

    //add the animal card to the Dom
    document.querySelector("#animal-list").appendChild(card);

    //Add an event listener to every donate button which will be used during updating the donations
    //Increment the donations by 200 everytime it is clicked
    card.querySelector("#donate").addEventListener("click", () => {
      animal.donation += 200;
      card.querySelector("span").textContent = animal.donation;

      updateDonation(animal);
    });
    //Add event listener to the Send to park button to delete animal from zoo
    card.querySelector("#set_free").addEventListener("click", () => {
      card.remove();
      deleteAnimal(animal.id);
    });
  }

  //FUNTIONS

  //Function to fetch data from BigFive
  function getAnimals() {
    fetch("http://localhost:3000/BigFive")
      .then((res) => res.json())
      .then((BigFive) => BigFive.forEach((animal) => renderAnAnimal(animal)));
  }
  //POST request to add a new animal that is adopted to the zoo through the form

  function adoptAnimal(animalObj) {
    fetch("http://localhost:3000/BigFive", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(animalObj),
    })
      .then((res) => res.json())
      .then((animal) => console.log(animal));
  }
  //Patch request to update the donation amount

  function updateDonation(animalObj) {
    updateDonation.preventDefault();

    fetch(`http://localhost:3000/BigFive/${animalObj.id}`, {
      method: "PATCH",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(animalObj),
    })
      .then((res) => res.json())
      .then((animal) => console.log(animal));
  }

  //Delete to be set on set free

  function deleteAnimal(id) {
    fetch(`http://localhost:3000/BigFive/${id}`, {
      method: "DELETE",
      header: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((animal) => console.log(animal));
  }

  function intialize() {
    getAnimals();
    //BigFive.forEach(animal =>renderAnAnimal(animal))
  }
  intialize();

  function SearchName() {
    const form = document.getElementById("searchForm");
    const input = document.getElementById("name").value;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      fetch(`http://localhost:3000/BigFive?animal=${input}`)
        .then((resp) => resp.json())
        .then((data) => {
          if (data.length != 0) {
            const resultsContainer =
              document.getElementById("resultsContainer");
            resultsContainer.className = "card resultcard";
            for (item of data) {
              const resultDetails = `
                    <img src="${item.image}">
    
    <h4>${item.animal}</h4>
    <br>
    <p>
   KES<span class ="donation-count">${item.donation}</span> Donated
   <p>
   <br>
   <p>${item.fact}</p>
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
                    `;
              resultsContainer.innerHTML = resultDetails;
            }
          }
          else{
            const resultsContainer=document.getElementById('resultsContainer')
            resultsContainer.className='card resultcard'
            const notFoundMessage =`<h2> Sorry,Animal not in  the zoo</h2>`
            resultsContainer.innerHTML=notFoundMessage
          }
          form.reset()
        });
    });
  }
  const searchButton =document.getElementById('searchButton')
  searchButton.addEventListener("click",SearchName)
});
