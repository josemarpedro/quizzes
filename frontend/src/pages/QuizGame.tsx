import { useEffect, useState } from "react"
import { api } from "../services/api" // Importa o serviço de API usado para comunicar com o backend

interface Quiz {
  //PEGAR PELOS SERVIÇOS quiz.service.ts
  /*
  id: string
  question: string
  country: string
  options: string[]
  correctAnswer: string
  */

// Meu código abaixo funciona bem, mas pega diretamente do database.
// Interface usada atualmente baseada diretamente na estrutura da base de dados
id: string
countryName: string
correctContinent: string
///// BUG: Humano 1 - Inteligência Artificial 0
}

export default function QuizGame() { // Componente principal do jogo de quiz
  const [quizzes, setQuizzes] = useState<Quiz[]>([]) // Guarda a lista de quizzes recebida do backend
  const [currentQuestion, setCurrentQuestion] = useState(0) // Índice da pergunta atual
  const [xp, setXp] = useState(0) // Estado que guarda os pontos (XP) do jogador

  useEffect(() => { // Executa quando o componente é carregado pela primeira vez
    api.get<Quiz[]>("/quizzes").then((response: { data: Quiz[] }) => { // Requisição para API usando Axios
      setQuizzes(response.data) // Guarda os quizzes recebidos no estado
    })
    fetch("http://localhost:3000/quizzes") // Segunda forma de obter os quizzes usando fetch nativo do navegador
    .then(res => res.json()) // Converte a resposta para JSON
    .then(data => {
      console.log("QUIZ xDATA:", data); // Mostra no console os dados recebidos do backend
      setQuizzes(data); // Atualiza o estado com os dados recebidos
    });
  }, []) // [] garante que o useEffect execute apenas uma vez

  if (quizzes.length === 0) { // Enquanto os quizzes ainda não foram carregados
    return <div>Carregando...</div> // Mostra mensagem de carregamento
  }

  if (currentQuestion >= quizzes.length) { // Quando todas as perguntas foram respondidas
    return <h1>Quiz terminado! XP total: {xp}</h1> // Mostra resultado final
  }

  const quiz = quizzes[currentQuestion] // Obtém a pergunta atual baseada no índice

  function answer(answer: string) { // Função chamada quando o jogador escolhe uma resposta
//  if (answer === quiz.correctAnswer) {
    if (answer === quiz.correctContinent) { // Verifica se o continente selecionado está correto
      setXp((prev) => prev + 50) // Se acertar ganha 50 XP
    } else {
      setXp((prev) => prev - 15) // Se errar perde 15 XP
    }
    setCurrentQuestion((prev) => prev + 1) // Avança para a próxima pergunta

//  console.log("-Continente Clicado: " + answer, "-Continente Backend: "+ quiz.correctAnswer)
    console.log("-Continente Clicado: " + answer, "-Continente Backend: "+ quiz.correctContinent) // Log para debug comparando resposta escolhida e resposta correta
  }
   
  return (    
    <div>
      <h2>XP: {xp}</h2> {/* Mostra XP atual do jogador */}
{/*    <h2>{"Em que Continente pertence " + quiz.question}</h2>    */}
      <h2>{"Em qual Continente fica " + quiz.countryName}</h2> {/* Mostra a pergunta usando o nome do país */}
      <button onClick={() => answer("Ásia")}>Ásia</button> {/* Botão que envia resposta "Ásia" */}
      <button onClick={() => answer("Europa")}>Europa</button>
      <button onClick={() => answer("África")}>África</button>
      <button onClick={() => answer("América do Norte")}>América do Norte</button>
      <button onClick={() => answer("América do Sul")}>América do Sul</button>
      <button onClick={() => answer("Oceania")}>Oceania</button>
      <button onClick={() => answer("Antártida")}>Antártida</button>
{/*
      {quiz.options?.map((option: string) => ( // Código alternativo para gerar opções dinamicamente
        <button
          key={option}
          onClick={() => answer(option)} // Envia a opção clicada como resposta
        >
          {option}
        </button>
      ))}
         */}
    </div>
  )

}