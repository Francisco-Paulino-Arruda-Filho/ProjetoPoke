// cypress/e2e/api.cy.ts
describe('Fluxo completo: cadastro -> login -> criar time -> adicionar -> editar -> remover Pokémon', () => {
  let token: string | null = null;
  let userId: string | null = null;
  let teamId: string | null = null;

  const apiUrl = 'http://localhost:8000';
  const uniq = Date.now();

  const testUser = {
    username: `user_${uniq}@test.com`,
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

  const raichu = {
    number: 26,
    name: 'Raichu',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png',
    types: ['electric'],
    description: 'Evolução do Pikachu',
    height: "0.8",
    weight: "30"
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
    cy.request('POST', `${apiUrl}/register`, testUser).then((res) => {
      expect([200, 201]).to.include(res.status);
      userId = res.body?.user_id || res.body?.id || res.body?._id || null;
    });

    cy.request('POST', `${apiUrl}/login`, {
      username: testUser.username, 
      password: testUser.password,
    }).then((res) => {
      expect(res.status).to.eq(200);
      token = res.body?.access_token || null;
      userId = userId || res.body?.user_id || null;
      ensureUserIdFromToken();
      expect(userId, 'userId resolvido (register/login/JWT)').to.be.a('string').and.not.be.empty;
    });
  });

  it('Fluxo de CRUD de Pokémon no time', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/team`,
      body: { user_id: userId }, 
      headers: authHeaders(),
    }).then((res) => {
      expect([200, 201]).to.include(res.status);
      teamId = res.body?._id || res.body?.id;
      expect(teamId, 'teamId criado').to.be.a('string').and.not.be.empty;
    })

    // 4) Adicionar Pokémon no slot 0 (POST)
    .then(() => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}/team/${teamId}/slot/0`,
        body: pikachu,
        headers: authHeaders(),
      }).then((res) => {
        expect(res.status).to.eq(200);
        if (res.body?.team) expect(res.body.team[0]?.name).to.eq('Pikachu');
      });
    })

    .then(() => {
      cy.request({
        method: 'PUT',
        url: `${apiUrl}/team/${teamId}/slot/0`,
        body: raichu,
        headers: authHeaders(),
      }).then((res) => {
        expect(res.status).to.eq(200);
        if (res.body?.team) expect(res.body.team[0]?.name).to.eq('Raichu');
      });
    })

    .then(() => {
      cy.request({
        method: 'DELETE',
        url: `${apiUrl}/team/${teamId}/slot/0`,
        headers: authHeaders(),
      }).then((res) => {
        expect(res.status).to.eq(200);
        if (res.body?.team) expect(res.body.team[0]).to.be.null;
      });
    })

    .then(() => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/team/${teamId}`,
        headers: authHeaders(),
      }).then((res) => {
        expect(res.status).to.eq(200);
        if (Array.isArray(res.body?.team)) {
          expect(res.body.team[0]).to.satisfy((v: any) => v == null);
        }
      });
    })

    .then(() => {
      cy.request({
        method: 'DELETE',
        url: `${apiUrl}/team/${teamId}`,
        headers: authHeaders(),
        failOnStatusCode: false,
      });
    });
  })
});
