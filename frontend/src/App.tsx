import { useEffect, useState } from 'react'; // Importa hooks do React para estado e efeitos
import './App.css'; // Importa o arquivo de estilos da aplicação
//import QuizPage from "./pages/QuizPage";
import QuizGame from "./pages/QuizGame"; // Importa o componente principal do jogo

function createOrGetUserId(): string { // Função responsável por criar ou recuperar um ID único do utilizador
  const key = 'quiz-system-user-id'; // Chave usada para guardar o ID no localStorage
  const existing = window.localStorage.getItem(key); // Tenta obter um ID já existente
  if (existing) return existing; // Se já existir, retorna esse ID

  const id = crypto.randomUUID(); // Caso não exista, cria um novo ID único
  window.localStorage.setItem(key, id); // Guarda o novo ID no localStorage
  return id; // Retorna o ID criado
}

function App() { // Componente principal da aplicação React
  const [userId, setUserId] = useState<string | null>(null); // Estado que guarda o ID do utilizador

  useEffect(() => { // Executa quando o componente é montado
    setUserId(createOrGetUserId()); // Cria ou recupera o ID do utilizador e guarda no estado
  }, []);

  if (!userId) { // Enquanto o ID ainda não foi definido
    return <p>Preparando o jogo...</p>; // Mostra mensagem de carregamento
  }

  //return <QuizPage />;
  return (
    <div>
      <QuizGame /> {/* Renderiza o componente principal do jogo */}
    </div>
  )
}

export default App; // Exporta o componente para ser usado no index.tsx