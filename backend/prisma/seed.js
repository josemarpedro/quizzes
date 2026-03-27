"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const quizzes = [
        { countryName: 'Japão', correctContinent: 'Ásia' },
        { countryName: 'Brasil', correctContinent: 'América do Sul' },
        { countryName: 'Alemanha', correctContinent: 'Europa' },
        { countryName: 'Egito', correctContinent: 'África' },
        { countryName: 'Austrália', correctContinent: 'Oceania' },
        { countryName: 'México', correctContinent: 'América do Norte' },
        { countryName: 'Argentina', correctContinent: 'América do Sul' },
        { countryName: 'Chile', correctContinent: 'América do Sul' },
        { countryName: 'Peru', correctContinent: 'América do Sul' },
        { countryName: 'Colômbia', correctContinent: 'América do Sul' },
        { countryName: 'França', correctContinent: 'Europa' },
        { countryName: 'Itália', correctContinent: 'Europa' },
        { countryName: 'Espanha', correctContinent: 'Europa' },
        { countryName: 'Portugal', correctContinent: 'Europa' },
        { countryName: 'Reino Unido', correctContinent: 'Europa' },
        { countryName: 'Holanda', correctContinent: 'Europa' },
        { countryName: 'Suíça', correctContinent: 'Europa' },
        { countryName: 'Suécia', correctContinent: 'Europa' },
        { countryName: 'Noruega', correctContinent: 'Europa' },
        { countryName: 'Finlândia', correctContinent: 'Europa' },
        { countryName: 'China', correctContinent: 'Ásia' },
        { countryName: 'Coreia do Sul', correctContinent: 'Ásia' },
        { countryName: 'Coreia do Norte', correctContinent: 'Ásia' },
        { countryName: 'Índia', correctContinent: 'Ásia' },
        { countryName: 'Tailândia', correctContinent: 'Ásia' },
        { countryName: 'Vietnã', correctContinent: 'Ásia' },
        { countryName: 'Indonésia', correctContinent: 'Ásia' },
        { countryName: 'Filipinas', correctContinent: 'Ásia' },
        { countryName: 'Arábia Saudita', correctContinent: 'Ásia' },
        { countryName: 'Turquia', correctContinent: 'Ásia' },
        { countryName: 'África do Sul', correctContinent: 'África' },
        { countryName: 'Nigéria', correctContinent: 'África' },
        { countryName: 'Angola', correctContinent: 'África' },
        { countryName: 'Quênia', correctContinent: 'África' },
        { countryName: 'Marrocos', correctContinent: 'África' },
        { countryName: 'Etiópia', correctContinent: 'África' },
        { countryName: 'Tanzânia', correctContinent: 'África' },
        { countryName: 'Nova Zelândia', correctContinent: 'Oceania' },
        { countryName: 'Fiji', correctContinent: 'Oceania' },
        { countryName: 'Papua-Nova Guiné', correctContinent: 'Oceania' },
    ];
    for (const quiz of quizzes) {
        await prisma.quiz.upsert({
            where: {
                countryName: quiz.countryName
            },
            update: {
                correctContinent: quiz.correctContinent
            },
            create: {
                countryName: quiz.countryName,
                correctContinent: quiz.correctContinent
            }
        });
    }
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map