// escontrando o botão adicionar tarefa

const botaoAddTarefa = document.querySelector('.app__button--add-task'); // estou selecionando o botão de adicionar tarefa
const formAddTarefa = document.querySelector('.app__form-add-task'); // estou selecionando o formulário de adicionar tarefa
const textarea = document.querySelector('.app__form-textarea'); // estou selecionando o textarea do formulário

const tarefas = []; // array para armazenar as tarefas

function criarElementoTarefa(tarefa){ // função para criar um elemento de tarefa
    const li = document.createElement('li'); // cria um elemento li
    li.classList.add('app__section-task-list-item'); // adiciona a classe ao elemento li

    const svg = document.createElement('svg'); // cria um elemento svg
    svg.innerHTML = `
        <svg>
            <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
                <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
            </svg>
        </svg>
    ` // adiciona o conteúdo SVG ao elemento svg

    const p = document.createElement('p'); // cria um elemento p
    p.textContent = tarefa.descricao; // adiciona a descrição da tarefa ao elemento p

    const button = document.createElement('button'); // cria um elemento button
    const imagemButton = document.createElement('img'); // cria um elemento img
    imagemButton.setAttribute('src', '/imagens/edit.png'); // adiciona o atributo src ao elemento img

    button.append(imagemButton); // adiciona o elemento img ao elemento button

    li.append(svg, p, button); // adiciona os elementos svg, p e button ao elemento li
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
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); // salva o array de tarefas no localStorage (armazenar dados não sensiveis no navegador do usuário)
    // sessionStorage.setItem('tarefas', JSON.stringify(tarefas)); // salva o array de tarefas no sessionStorage (armazenar dados temporarios no navegador do usuário)
    // cookieStore.set('tarefas', JSON.stringify(tarefas)); // salva o array de tarefas nos cookies (armazenar dados no navegador do usuário com data de expiração)
})
