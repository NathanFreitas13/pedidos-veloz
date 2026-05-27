# 📦 Plataforma Pedidos Veloz (Loja Veloz) - Cloud-Native MVP

**Instituição:** UniFECAF  
**Curso:** Análise e Desenvolvimento de Sistemas  
**Autor:** Nathan Rodrigues de Freitas  
**RA:** 98502  
**Disciplina:** Cloud DevOps: Orchestrating Containers and Micro Services  

---

## 🎥 Vídeo Pitch (Apresentação do Projeto)
Confira a demonstração prática do ambiente e a defesa das decisões arquiteturais adotadas neste projeto:
👉 **[Assistir no YouTube](https://youtu.be/XwxJX3H1L38)**

---

## 📌 Sobre o Projeto
Este repositório contém a prova de conceito (MVP) para a modernização da infraestrutura da **Loja Veloz**. O objetivo central é solucionar problemas crônicos de indisponibilidade em produção, lentidão nos deploys e falta de escalabilidade em picos de acesso. A arquitetura monolítica foi segmentada em microsserviços conteinerizados e orquestrados, implementando esteiras automatizadas de integração e entrega contínuas (CI/CD) com foco em confiabilidade e observabilidade.

## 🏗️ Arquitetura e Stack de Tecnologias
* **Backend:** Node.js, Express, TypeScript (Serviço de Pedidos)
* **API Gateway:** NGINX (Roteamento HTTP e proxy reverso)
* **Banco de Dados:** PostgreSQL (Persistência relacional)
* **Conteinerização:** Docker & Docker Compose (Imagens Multi-stage otimizadas)
* **Orquestração de Contêineres:** Kubernetes (K8s) utilizando Deployments, Services, ConfigMaps, Secrets ofuscados e Horizontal Pod Autoscaler (HPA)
* **Automação (CI/CD):** GitHub Actions (Quality gates, testes e push de artefatos)
* **IaC (Infraestrutura como Código):** Terraform (Provisionamento declarativo para clusters AWS EKS)

---

## 🚀 Instruções de Execução (Ambiente Local)

Para eliminar problemas de divergência de ambientes e garantir o isolamento das dependências, a execução local foi padronizada através do Docker.

### Pré-requisitos
* [Git](https://git-scm.com/)
* [Docker Desktop](https://www.docker.com/) (com o Docker Compose e Engine ativos na máquina).

### Passo a Passo

**1. Clone o repositório**
Abra o seu terminal e execute:
`git clone https://github.com/NathanFreitas13/pedidos-veloz.git`
`cd pedidos-veloz`

**2. Suba a infraestrutura local**
Execute o comando abaixo para que o Docker baixe a imagem do banco de dados, construa as imagens da aplicação (descartando dependências de desenvolvimento) e inicie os microsserviços na rede isolada:
`docker-compose up -d --build`

**3. Valide o funcionamento (Readiness Probe)**
Aguarde aproximadamente 15 segundos para que o PostgreSQL seja inicializado e a API estabeleça a conexão. Em seguida, acesse a rota de verificação de saúde da aplicação no seu navegador:
* **URL:** http://localhost:8080/api/orders/ready
* **Retorno Esperado:** `{"status":"READY","db":"connected"}`

**4. Parar a aplicação**
Para desligar os contêineres sem remover as imagens construídas ou perder os volumes persistidos do banco de dados:
`docker-compose down`

---

## ⚙️ Estrutura do Repositório (DevOps)

O projeto adota a padronização de um *monorepo*, separando claramente o código da aplicação da infraestrutura de implantação:

* 📁 **`/services`**: Contém o código-fonte dos microsserviços (`orders`, `api-gateway`) e seus respectivos `Dockerfiles` configurados com usuários não-root para segurança.
* 📁 **`/infra/k8s`**: Manifestos declarativos para implantação em produção no Kubernetes, garantindo *Rolling Updates* com zero downtime e autoescala (HPA).
* 📁 **`/infra/terraform`**: Esqueleto em sintaxe HCL (Terraform) focado na reprodutibilidade da infraestrutura e recuperação de desastres.
* 📁 **`/.github/workflows`**: Pipelines automatizados separando Integração Contínua (Testes/Build) de Entrega Contínua (Push para o Registry e deploy simulado).