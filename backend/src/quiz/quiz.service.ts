import { Injectable, NotFoundException } from '@nestjs/common'; // Importa decoradores e exceções do NestJS
import { PrismaService } from '../prisma/prisma.service'; // Serviço responsável pela comunicação com o banco via Prisma

@Injectable() // Marca esta classe como um serviço que pode ser injetado pelo NestJS
export class QuizService {

  constructor(private prisma: PrismaService) {} // Injeta o PrismaService para acesso ao banco de dados

  async getAllQuizzes() { // Método que retorna todos os quizzes armazenados no banco
    return this.prisma.quiz.findMany(); // Busca todos os registros da tabela quiz
  /*
    const quizzes = await this.prisma.quiz.findMany()

    return quizzes.map(xEndpoint => ({
      id: xEndpoint.id,
      question: `Em qual continente fica o país ${xEndpoint.countryName}?`,
      country: xEndpoint.countryName,
      options: this.generateOptions(xEndpoint.correctContinent), /// Gera opções de resposta automaticamente
      correctAnswer: xEndpoint.correctContinent
    }))
  }

  generateOptions(correct: string) { // Função responsável por gerar alternativas de resposta
    const continents = [
      "Ásia",
      "Europa",
      "África",
      "América do Norte",
      "América do Sul",
      "Oceania",
      "Antártida"
    ]
  
    // Remove a resposta correta para evitar duplicação
    const wrongOptions = continents.filter(c => c !== correct)
  
    // Escolhe 3 erradas aleatoriamente
    const shuffled = wrongOptions.sort(() => 0.5 - Math.random()).slice(0, 3)
  
    // Junta com a correta
    return [...shuffled, correct].sort(() => 0.5 - Math.random()) // Mistura as opções para aparecerem em ordem aleatória
  */
    }


  async answerQuiz(quizId: string, userId: string, answer: string) { // Método responsável por processar a resposta do utilizador

    const quiz = await this.prisma.quiz.findUnique({ // Procura o quiz correspondente no banco
      where: { id: quizId }
    });

    if (!quiz) { // Caso o quiz não exista
      throw new NotFoundException('Quiz não encontrado'); // Lança exceção HTTP 404
    }

    const user = await this.prisma.user.findUnique({ // Procura o utilizador que respondeu ao quiz
      where: { id: userId }
    });

    if (!user) { // Caso o utilizador não exista
      throw new NotFoundException('User não encontrado'); // Lança exceção HTTP 404
    }

    let correct = false; // Variável que indica se a resposta está correta ou não

    if (answer === quiz.correctContinent) { // Verifica se a resposta enviada pelo utilizador é igual ao continente correto
      correct = true; // Marca como correta
      user.experience += 50; // Se acertar ganha 50 pontos de experiência
    } else {
      user.experience -= 15; // Se errar perde 15 pontos de experiência
    }

    await this.prisma.user.update({ // Atualiza a experiência do utilizador na base de dados
      where: { id: userId },
      data: { experience: user.experience }
    });

    return { // Retorna o resultado da resposta
      correct, // Indica se acertou ou não
      experience: user.experience // Retorna a experiência atualizada
    };
  }
}