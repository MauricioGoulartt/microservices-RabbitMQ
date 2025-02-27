# microservices-RabbitMQ

## Microservices com RabbitMQ (Node.js)

Este projeto demonstra a comunicação entre **producer** e **consumer** usando **RabbitMQ** como broker de mensagens.  
Você terá:

- **Producer**: envia mensagens para a fila  
- **Consumer**: recebe mensagens da fila e as processa  
- **RabbitMQ**: orquestra o envio/recebimento (com interface de gerenciamento)

### Pré-requisitos

- Docker instalado  
- Docker Compose

### Como Rodar

#### Clonar o repositório
```bash
git clone https://github.com/seu-usuario/microservices-rabbitmq.git
cd microservices-rabbitmq
```

#### Subir os containers
```bash
docker-compose up --build
```
Isso irá:
- Baixar/Construir as imagens do **producer**, **consumer** e **RabbitMQ**.
- Iniciar os contêineres e exibir logs no terminal.

#### Acessar o RabbitMQ
- Abra [http://localhost:15672](http://localhost:15672)
- Use as credenciais padrão (caso não tenha alterado):
  - **Usuário**: guest
  - **Senha**: guest

### Testando o Envio de Mensagens
Em outro terminal, execute:
```bash
curl -X POST http://localhost:3000/nova-transacao \
  -H "Content-Type: application/json" \
  -d '{"valor":100,"tipo":"pagamento"}'
```
Esperado: `{"status":"OK"}`

### Observando o Consumer
No terminal onde o `docker-compose` está rodando:
- Você deve ver o log de **Mensagem recebida**, indicando que o consumer processou a mensagem.

### Configurando Usuário/Senha do RabbitMQ
Se quiser configurar usuário e senha diferentes de `guest/guest`, pode adicionar variáveis de ambiente no `docker-compose.yml`:
```yaml
rabbitmq:
  image: rabbitmq:3-management
  environment:
    RABBITMQ_DEFAULT_USER: "meuUsuario"
    RABBITMQ_DEFAULT_PASS: "minhaSenhaSegura"
```
Depois, acesse `http://localhost:15672` com `meuUsuario/minhaSenhaSegura`.  
Também será necessário ajustar o **consumer** e o **producer** para usar a URL com essas credenciais se você adicionar autenticação ao broker. Exemplo:
```js
// Conexão RabbitMQ
const connection = await amqp.connect('amqp://meuUsuario:minhaSenhaSegura@rabbitmq:5672');
```

### Encerrando
- Para encerrar os serviços, pressione **CTRL + C** no terminal que está rodando o `docker-compose`.
- Opcionalmente, remova todos os contêineres/paradas:
```bash
docker-compose down
```
