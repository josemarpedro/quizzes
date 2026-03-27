import { useEffect, useState } from "react";
import axios from "axios";

export default function QuizPage() {

  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [experience, setExperience] = useState(0);
  const [resultMessage, setResultMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/quizzes")
      .then(res => {
        setQuizzes(res.data);
      });
  }, []);

  if (quizzes.length === 0) {
    return <h2>Carregando perguntas...</h2>;
  }

  const currentQuiz = quizzes[currentIndex];

  const handleAnswer = async () => {

    const response = await axios.post(
      `http://localhost:3000/quizzes/${currentQuiz.id}/answer`,
      {
        userId: "1", // depois podemos melhorar isso
        answer: selectedAnswer
      }
    );

    setExperience(response.data.experience);
    setResultMessage(
      response.data.correct ? "✅ Correto!" : "❌ Errado!"
    );

    setSelectedAnswer("");

    // Passa para próxima pergunta
    setCurrentIndex(prev => prev + 1);
  };

  // Se terminou todas perguntas
  if (currentIndex >= quizzes.length) {
    return (
      <div>
        <h2>🎉 Quiz Finalizado</h2>
        <h3>XP Final: {experience}</h3>
      </div>
    );
  }

  return (
    <div>
      <h2>
        Em que continente fica {currentQuiz.countryName}?
      </h2>

      <p>XP: {experience}</p>

      <select
        value={selectedAnswer}
        onChange={(e) => setSelectedAnswer(e.target.value)}
      >
        <option value="">Selecione uma resposta</option>
        <option>Ásia</option>
        <option>Europa</option>
        <option>África</option>
        <option>América do Norte</option>
        <option>América do Sul</option>
        <option>Oceania</option>
      </select>

      <button onClick={handleAnswer}>
        Responder
      </button>

      <h3>{resultMessage}</h3>
    </div>
  );
}