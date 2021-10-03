let allpokemons = [];

fetch("https://lu-poke-api.herokuapp.com/pokemons")
    .then((res) => res.json())
    .then((pokemons) => {
        console.log(pokemons);
        allpokemons = pokemons;
        display(allpokemons);
    });

let display = (pokemons) => {
    let index = pokemons.length;
    let pokemon = "";
    pokemons.map((data) => {
        pokemon += `
                <div class="pokemon">
                    <div class="overlay" style="z-index:${index};">
                        <div class="overlay-details" style="padding: 30px 15px">
                          <div>
                            <h1>${data.name}</h1>
                            <p>${data.type}</p>
                          </div>
                            <div>
                                <button class="btn" onclick="deletepokemon('${
                                    data._id
                                }')">Delete</button>
                            </div>
                        </div>
                      
                    </div>
                    <div class="more" style="z-index:${index - 1};">
                        <div class="more-details">
                            <p style="width:40%; color:white;">
                                HP : ${data.base.HP}
                            </p>

                            <p style="width:40%; color:white;">
                               Attack : ${data.base.Attack}
                            </p>

                            <p style="width:40%; color:white;">
                                Defense : ${data.base.Defense}
                            </p>

                            <p style="width:40%; color:white;">
                                 Speed : ${data.base.Speed}
                            </p>
                        </div>

                    </div>
                </div>

            `;
        index--;
    });
    document.getElementById("update-pokemon").innerHTML = pokemon;
};

let toast = (message) => {
    document.getElementById("toast").style.opacity = "1";

    document.getElementById("message").innerHTML = message;
    setTimeout(() => {
        document.getElementById("toast").style.opacity = "0";
    }, 800);
};
let toastdelete = (message) => {
    document.getElementById("toast").style.opacity = "1";
    document.getElementById("message").innerHTML = message;
    setTimeout(() => {
        document.getElementById("toast").style.opacity = "0";
    }, 800);
};

let addpokemon = () => {
    let pokemon = { base: {} };
    pokemon.name = document.getElementById("name").value;
    pokemon.type = document.getElementById("type").value;
    pokemon.base.HP = document.getElementById("Hp").value;
    pokemon.base.Attack = document.getElementById("Attack").value;
    pokemon.base.Defense = document.getElementById("Defense").value;
    pokemon.base.Speed = document.getElementById("Speed").value;

    fetch("https://lu-poke-api.herokuapp.com/pokemons", {
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(pokemon),
    })
        .then((res) => res.json())
        .then((pokemon) => {
            document.getElementById("addfrom").reset();

            allpokemons.push(pokemon);
            display(allpokemons);
            toast("Pokemon Created");
        });
};
let deletepokemon = (id) => {
    fetch(`https://lu-poke-api.herokuapp.com/pokemons/${id}`, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((pokemons) => {
            let index = allpokemons.findIndex((p) => {
                p._id === id;
            });
            allpokemons.splice(index, 1);
            display(allpokemons);
            toastdelete("Pokemon Deleted");
        })
        .catch((err) => {
            console.log(err);
        });
};
