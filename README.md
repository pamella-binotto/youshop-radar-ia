# ⚡ You.Shop | Control & AI — Radar Preditivo de Ruptura

Protótipo funcional desenvolvido para o **Desafio de Inovação — Programa de Estágio You.Shop 2027**. 

A aplicação resolve um gargalo crítico de operações e atendimento no social commerce: **rupturas de estoque causadas por picos repentinos de divulgação de creators**[cite: 9]. Em vez de reagir apenas quando o produto esgota e os pedidos atrasam, o sistema cruza a velocidade de cliques nos links rastreáveis com o saldo físico em tempo real, acionando travas preventivas e comunicação proativa com o comprador[cite: 9].

---

## 🎯 O Problema Resolvido

No ecossistema da **You.Shop**, marcas cadastram produtos físicos e *creators* divulgam links rastreáveis para suas audiências[cite: 9]. Quando um conteúdo viraliza:
* O volume de acessos e vendas dispara em poucas horas[cite: 5].
* O estoque físico pode acabar antes que o produtor perceba ou pause a campanha[cite: 5].
* **Consequência:** Vendas sem lastro, atrasos na entrega, aumento de tickets no *Atendimento ao Comprador*, reclamações públicas, estornos e *chargebacks*[cite: 5, 9].

---

## 🤖 Como a Solução & a IA Atuam

1. **Monitoramento Preditivo (Tráfego × Estoque):** Compara a taxa de cliques/hora nos links de *creators* com o saldo real de cada SKU cadastrado na base[cite: 5].
2. **Detecção Antecipada de Ruptura:** Calcula a demanda projetada para as próximas 24 horas e sinaliza o risco antes que o estoque zere[cite: 5].
3. **Copiloto de Ação Operacional & CX:**
   * **Trava Preventiva (Operações):** Sugere a pausa temporária na geração de novos links de afiliação e notifica o produtor para reposição[cite: 5].
   * **Comunicação Proativa (Atendimento):** Gera uma mensagem personalizada de transparência e reserva para os compradores, reduzindo ansiedade, tickets de suporte e *chargebacks*[cite: 5].

---

## 🛠 Tecnologias Utilizadas

| Tecnologia | Função no Projeto |
| :--- | :--- |
| **React + Vite** | Interface interativa e simulação em tempo real[cite: 7] |
| **JavaScript (ES6+)** | Lógica de projeção de demanda e regras de alerta[cite: 5, 7] |
| **CSS3** | Estilização alinhada à identidade visual da You.Shop[cite: 5, 9] |
| **Java + Spring Boot** | API REST consumida para leitura e gestão de produtos (`Stock Control API`) |
| **PostgreSQL** | Persistência dos dados de estoque em produção[cite: 6, 8] |

---

## 📁 Estrutura do Projeto

```text
src/
├── components/
│   ├── RadarYouShop.jsx     # Painel preditivo, simulação de picos e recomendações de IA
│   ├── RadarYouShop.css     # Identidade visual e layout do radar operacional
│   ├── ProductForm.jsx      # Cadastro e edição de produtos na API[cite: 7]
│   ├── ProductList.jsx      # Listagem de produtos sincronizados[cite: 7]
│   ├── ErrorMessage.jsx     # Tratamento visual de erros[cite: 7]
│   └── SuccessMessage.jsx   # Feedback de operações[cite: 7]
├── hooks/
│   └── useProducts.js       # Integração de estado com a API REST[cite: 7]
├── services/
│   └── api.js               # Comunicação HTTP (Fetch API) com o back-end[cite: 7]
├── App.jsx                  # Navegação entre o Radar Preditivo IA e a Base de Produtos[cite: 5, 7]
└── main.jsx                 # Ponto de entrada da aplicação[cite: 7]

# 1. Clonar o repositório
git clone [https://github.com/pamella-binotto/youshop-radar-ia.git](https://github.com/pamella-binotto/youshop-radar-ia.git)

# 2. Acessar a pasta do projeto
cd youshop-radar-ia

# 3. Instalar as dependências
npm install

# 4. Configurar a variável de ambiente (opcional — possui fallback local)
# Crie um arquivo .env na raiz com:
# VITE_API_URL=[https://stock-control-dgm5.onrender.com](https://stock-control-dgm5.onrender.com)[cite: 6]

# 5. Iniciar o servidor de desenvolvimento
npm run dev

🔗 Arquitetura Integrada

Este front-end consome a API RESTful desenvolvida previamente no projeto Stock Control

Repositório Back-end (Java / Spring Boot): github.com/pamella-binotto/Stock-Control   

💻 Autora Pamella Binotto — Desenvolvedora Full Stack & Graduanda em Engenharia de Software 
  