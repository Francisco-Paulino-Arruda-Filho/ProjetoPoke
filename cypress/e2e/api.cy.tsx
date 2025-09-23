// cypress/e2e/api.cy.ts
describe('Fluxo completo da API', () => {
  let token: string | null = null;
  let userId: string | null = null;
  let teamId: string | null = null;

  const apiUrl = 'http://localhost:8000';
  const uniq = Date.now();

  const testUser = {
    username: `user_${uniq}`,
    email: `user_${uniq}@test.com`,
    password: '123456'
  };

  const pikachu = {
    number: 25,
    name: 'Pikachu',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    types: ['electric'],
    description: 'Rato elétrico',
    height: "0.4",
    weight: "6"
  };

  function authHeaders() {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  function ensureUserIdFromToken() {
    if (!userId && token) {
      const payloadPart = token.split('.')[1];
      const json = JSON.parse(atob(payloadPart));
      userId = json.id || json.user_id || null; 
    }
  }

  before(() => {
    // Cadastro
    cy.request('POST', `${apiUrl}/register`, testUser).then((res) => {
      expect([200, 201]).to.include(res.status);
    });

    // Login
    cy.request('POST', `${apiUrl}/login`, {
      username: testUser.email,
      password: testUser.password,
    }).then((res) => {
      expect(res.status).to.eq(200);
      token = res.body?.access_token;
      userId = res.body?.user_id;
      ensureUserIdFromToken();
      expect(userId).to.be.a('string').and.not.be.empty;
    });
  });

  it('Fluxo CRUD completo + endpoints extras', () => {
    // Criar time
    cy.request({
      method: 'POST',
      url: `${apiUrl}/team`,
      body: { user_id: userId }, 
      headers: authHeaders(),
    }).then((res) => {
      expect([200, 201]).to.include(res.status);
      teamId = res.body?._id || res.body?.id;
      expect(teamId).to.be.a('string').and.not.be.empty;
    })

    // Adicionar Pokémon
    .then(() => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}/team/${teamId}/slot/0`,
        body: pikachu,
        headers: authHeaders(),
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.team[0].name).to.eq('Pikachu');
      });
    })

    // Buscar time por ID
    .then(() => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/team/${teamId}`,
        headers: authHeaders(),
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body._id).to.eq(teamId);
      });
    })

    // Buscar time por outro endpoint (/teams/{team_id})
    .then(() => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/teams/${teamId}`,
        headers: authHeaders(),
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body._id).to.eq(teamId);
      });
    })

    // Buscar todos os times
    .then(() => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/all_teams`,
        headers: authHeaders(),
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.be.an('array');
        expect(res.body.some((t: any) => t._id === teamId)).to.be.true;
      });
    })

    // Buscar times por usuário
    .then(() => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/team/${userId}/user`,
        headers: authHeaders(),
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.be.an('array');
        expect(res.body.some((t: any) => t._id === teamId)).to.be.true;
      });
    })

    // Deletar time
    .then(() => {
      cy.request({
        method: 'DELETE',
        url: `${apiUrl}/team/${teamId}`,
        headers: authHeaders(),
      }).then((res) => {
        expect(res.status).to.eq(200);
      });
    })

    // Deletar usuário
    .then(() => {
      cy.request({
        method: 'DELETE',
        url: `${apiUrl}/user/${userId}`,
        headers: authHeaders(),
      }).then((res) => {
        expect(res.status).to.eq(200);
      });
    });
  });
});
