import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

let pedidos = [];
let rotas = [];

app.get('/pedidos', (req, res) => {
  res.json(pedidos);
});

app.post('/pedidos', (req, res) => {
  const pedido = req.body;
  pedidos.push(pedido);
  res.status(201).json(pedido);
});

app.get('/rotas', (req, res) => {
  res.json(rotas);
});

app.post('/rotas', (req, res) => {
  const rota = req.body;
  rotas.push(rota);
  res.status(201).json(rota);
});

app.get('/melhor-rota/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const rota = rotas.find(r => r.id === id);

  if (!rota) {
    return res.status(404).json({ message: 'Rota não encontrada' });
  }

  res.json({ melhorRota: rota });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

export default app;  
