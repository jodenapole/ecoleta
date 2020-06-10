//Função para popular a lista de estados
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then( res => res.json() )
    .then( states => {

        for(state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    } )
}

populateUFs()

//Função para popular a lista de cidades de acordo com o estado
function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = ""
    citySelect.disabled = true
    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        
        for(const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}

//Evento que detecta o evento de mudança de estado e chama a função de mudar de cidade 
document
        .querySelector("select[name=uf]")
       .addEventListener("change", getCities)

//Seleção dos itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")

//Toda vez que houver o clique, ele vai selecionar e deselecionar um item da lista
for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

//Constante criada pra mudar o valor do input da lista
const collectedItems = document.querySelector("input[name=items]")

//Array que contém quais itens estão selecionados
let selectedItems = []

//Função para lidar com o item selecionado
function handleSelectedItem(event){
    const itemLi = event.target

    // Adicionar e remover classes com JS
    itemLi.classList.toggle("selected")

    //Constante que identifica o item da lista
    const itemId = itemLi.dataset.id

    // Verificação se o array está vazio
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // Recebe T/F baseado na resposta da comparação
        return itemFound // Retorna se for T
    })

    // Retirar do array um item que já está selecionado
    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId //Recebe T/F baseado na resposta da comparação
            return itemIsDifferent // Retorna se for T
        })

        selectedItems = filteredItems
    } 
    // Adiciona ao array o item não selecionado
    else{
        selectedItems.push(itemId)
    }
    
    //Atualizar o input com os itens selecionados
    collectedItems.value = selectedItems
}