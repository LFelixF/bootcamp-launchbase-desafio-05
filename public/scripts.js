// Formulario
const form = document.querySelector(".form-fields")
const formInput = document.querySelectorAll(".form-fields input")

form.addEventListener("submit", event => {
    for(let input of formInput) {
        if(input.value == "") {
            event.preventDefault()
            
            return alert("Por favor, preencha todos os campos!")
        }
    }
})

// Menu ativo
const pageCurrent = window.location.pathname
const links = document.querySelectorAll("header .links a")

for(let link of links) {
    if(pageCurrent.includes(link.getAttribute("href"))) {
        link.classList.add("active")
    }
}

// Verifica a intenção de deletar algum dado
const formDelete = document.querySelector("#form-delete")

formDelete.addEventListener("submit", (event) => {
    const confirmation = confirm("Deseja excluir usuário?")

    if(!confirmation) event.preventDefault()
})