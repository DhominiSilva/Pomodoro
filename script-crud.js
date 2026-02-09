// escontrando o botão adicionar tarefa

const botaoAddTarefa = document.querySelector('.app__button--add-task'); // estou selecionando o botão de adicionar tarefa
const formAddTarefa = document.querySelector('.app__form-add-task'); // estou selecionando o formulário de adicionar tarefa
const textarea = document.querySelector('.app__form-textarea'); // estou selecionando o textarea do formulário
const ulTarefas = document.querySelector('.app__section-task-list'); // estou selecionando a lista de tarefas
const paragrafoDescTarefa = document.querySelector('.app__section-active-task-description'); // estou selecionando o parágrafo da descrição da tarefa

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []; // recupera as tarefas do localStorage ou inicializa um array vazio

function atualizarTarefasNoStorage(){ // função para atualizar as tarefas no localStorage
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); // salva o array de tarefas no localStorage
}

function criarElementoTarefa(tarefa){ // função para criar um elemento de tarefa
    const li = document.createElement('li'); // cria um elemento li
    li.classList.add('app__section-task-list-item'); // adiciona a classe ao elemento li

    const svg = document.createElement('svg'); // cria um elemento svg
    svg.classList.add('app__section-task-icon-status'); // adiciona a classe ao elemento svg
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    ` // adiciona o conteúdo SVG ao elemento svg

    const p = document.createElement('p'); // cria um elemento p
    p.textContent = tarefa.descricao; // adiciona a descrição da tarefa ao elemento p
    p.classList.add('app__section-task-list-item-description'); // adiciona a classe ao elemento p

    const button = document.createElement('button'); // cria um elemento button
    button.classList.add('app_button-edit'); // adiciona a classe ao elemento button

    button.onclick = () => { // quando o botão for clicado, faça:
        // debugger; // serve para debugar o código pelo navegador
        const novaDesc = prompt('Edite sua tarefa:', p.textContent); // abre um prompt para editar a tarefa
        // console.log("Nova descrição da tarefa: " + novaDesc); // exibe a nova descrição da tarefa no console
        if (novaDesc === null || novaDesc.trim() === '') return; // se a nova descrição for nula ou vazia, retorna
        p.textContent = novaDesc; // atualiza o texto do elemento p com a nova descrição
        tarefa.descricao = novaDesc; // atualiza a descrição da tarefa no array de tarefas
        atualizarTarefasNoStorage(); // atualiza as tarefas no localStorage
    }

    const imagemButton = document.createElement('img'); // cria um elemento img
    imagemButton.setAttribute('src', '/imagens/edit.png'); // adiciona o atributo src ao elemento img
    button.append(imagemButton); // adiciona o elemento img ao elemento button

    li.append(svg, p, button); // adiciona os elementos svg, p e button ao elemento li

    li.onclick = () => { // quando o elemento li for clicado, faça:
        paragrafoDescTarefa.textContent = tarefa.descricao; // atualiza o texto do parágrafo da descrição da tarefa com a descrição da tarefa clicada
        li.classList.add('app__section-task-list-item-active'); // adiciona a classe de item ativo ao elemento li
    }

    return li; // retorna o elemento li
}

// função que alterna a visibilidade do formulário de adicionar tarefa
botaoAddTarefa.addEventListener('click', () => { // quando o botão de adicionar tarefa for clicado, faça:
    formAddTarefa.classList.toggle('hidden'); // alterna a visibilidade do formulário de adicionar tarefa
})

// função que adiciona uma tarefa e salva no localStorage(para que quando recarregue a página, as tarefas não sejam perdidas)
formAddTarefa.addEventListener('submit', (evento) => { // quando o formulário de adicionar tarefa for enviado, faça:
    evento.preventDefault(); // previne o comportamento padrão do formulário
    const tarefa = { 
        descricao: textarea.value // cria um objeto tarefa com a descrição do textarea
    }
    tarefas.push(tarefa); // adiciona a tarefa ao array de tarefas
    // sessionStorage.setItem('tarefas', JSON.stringify(tarefas)); // salva o array de tarefas no sessionStorage (armazenar dados temporarios no navegador do usuário)
    // cookieStore.set('tarefas', JSON.stringify(tarefas)); // salva o array de tarefas nos cookies (armazenar dados no navegador do usuário com data de expiração)
    const elementoTarefa = criarElementoTarefa(tarefa); // cria um elemento de tarefa
    ulTarefas.append(elementoTarefa); // adiciona o elemento de tarefa à lista de tarefas
    textarea.value = ''; // limpa o textarea
    formAddTarefa.classList.add('hidden'); // esconde o formulário de adicionar tarefa
    atualizarTarefasNoStorage(); // atualiza as tarefas no localStorage
})

tarefas.forEach(tarefa => { // para cada tarefa no array de tarefas, faça:
    const elementoTarefa = criarElementoTarefa(tarefa); // cria um elemento de tarefa
    ulTarefas.append(elementoTarefa); // adiciona o elemento de tarefa à lista de tarefas
});