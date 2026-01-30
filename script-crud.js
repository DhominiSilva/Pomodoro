// escontrando o botão adicionar tarefa

const botaoAddTarefa = document.querySelector('.app__button--add-task'); // estou selecionando o botão de adicionar tarefa
const formAddTarefa = document.querySelector('.app__form-add-task'); // estou selecionando o formulário de adicionar tarefa
const textarea = document.querySelector('.app__form-textarea'); // estou selecionando o textarea do formulário

const tarefas = []; // array para armazenar as tarefas

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
