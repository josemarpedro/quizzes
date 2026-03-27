FROM node:20

# Criar diretório da aplicação
RUN mkdir -p /app
WORKDIR /app
#WORKDIR /usr/src/app

# Copiar dependências primeiro (melhora cache do Docker)
COPY package*.json /app/

# Instalar dependências
RUN npm install

# Copiar todo o código do projeto
COPY . /app/

# Após compilar o TS
RUN cp -r dist/src/* dist/ && rm -rf dist/src
#COPY src/. ./dist/

# Gerar cliente Prisma
RUN npx prisma generate

# Compilar TypeScript (NestJS)
RUN npm run build

# Porta usada pelo NestJS
EXPOSE 3000

# Executar aplicação compilada
CMD ["node", "dist/main.js"]
#CMD ["node", "dist/src/main.js"]

# Usar ts-node no dev
#CMD ["npm","run","start"]