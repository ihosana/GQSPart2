import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('API Testes de Integração', () => {
  let request;
  let app;

  before(async () => {
    const moduleRequest = await import('supertest');
    const moduleApp = await import('../App.js'); 

    request = moduleRequest.default;
    app = moduleApp.default; 
  });

  it('Deve retornar uma lista de pedidos', async () => {
    const res = await request(app).get('/pedidos');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('Deve criar um novo pedido', async () => {
    const novoPedido = { id: 1, descricao: 'Pedido 1' };
    const res = await request(app).post('/pedidos').send(novoPedido);
    expect(res.status).to.equal(201);
    expect(res.body).to.deep.equal(novoPedido);
  });

  it('Deve retornar uma lista de rotas', async () => {
    const res = await request(app).get('/rotas');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('Deve criar uma nova rota', async () => {
    const novaRota = { id: 1, descricao: 'Rota 1' };
    const res = await request(app).post('/rotas').send(novaRota);
    expect(res.status).to.equal(201);
    expect(res.body).to.deep.equal(novaRota);
  });

  it('Deve retornar a melhor rota para um pedido', async () => {
    const res = await request(app).get('/melhor-rota/1');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('melhorRota');
  });
});
