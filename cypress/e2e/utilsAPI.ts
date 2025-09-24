export const registerUser = (
  url: string,
  user: { username: string; email: string; password: string },
  options: { failOnStatusCode?: boolean } = {}
) => {
  return cy.request({
    method: "POST",
    url: `${url}/register`,
    body: user,
    failOnStatusCode: options.failOnStatusCode ?? true,
  });
};

export const loginUser = (
  url: string,
  creds: { username: string; password: string },
  options: { failOnStatusCode?: boolean } = {}
) => {
  return cy.request({
    method: "POST",
    url: `${url}/login`,
    body: creds,
    failOnStatusCode: options.failOnStatusCode ?? true,
  });
};

export const deleteUser = (
  url: string,
  userId: string,
  token_type: string,
  token: string,
  options: { failOnStatusCode?: boolean } = {}
) => {
  return cy.request({
    method: "DELETE",
    url: `${url}/user/${userId}`,
    headers: { Authorization: `${token_type} ${token}` },
    failOnStatusCode: options.failOnStatusCode ?? true,
  });
};

export const createTeam = (
  url: string,
  userId: string,
  token_type: string,
  token: string,
  options: { failOnStatusCode?: boolean } = {}
) => {
  return cy.request({
    method: "POST",
    url: `${url}/team`,
    body: { user_id: userId },
    headers: { Authorization: `${token_type} ${token}` },
    failOnStatusCode: options.failOnStatusCode ?? true,
  });
};

export const getTeamById = (
  url: string,
  teamId: string,
  token_type: string,
  token: string,
  options: { failOnStatusCode?: boolean } = {}
) => {
  return cy.request({
    method: "GET",
    url: `${url}/team/${teamId}`,
    headers: { Authorization: `${token_type} ${token}` },
    failOnStatusCode: options.failOnStatusCode ?? true,
  });
};

export const getAllTeams = (
  url: string,
  token_type: string,
  token: string,
  options: { failOnStatusCode?: boolean } = {}
) => {
  return cy.request({
    method: "GET",
    url: `${url}/all_teams`,
    headers: { Authorization: `${token_type} ${token}` },
    failOnStatusCode: options.failOnStatusCode ?? true,
  });
};

export const getTeamsByUser = (
  url: string,
  userId: string,
  token_type: string,
  token: string,
  options: { failOnStatusCode?: boolean } = {}
) => {
  return cy.request({
    method: "GET",
    url: `${url}/team/${userId}/user`,
    headers: { Authorization: `${token_type} ${token}` },
    failOnStatusCode: options.failOnStatusCode ?? true,
  });
};

export const addPokemonToSlot = (
  url: string,
  teamId: string,
  slot: number,
  pokemon: any,
  token_type: string,
  token: string,
  options: { failOnStatusCode?: boolean } = {}
) => {
  return cy.request({
    method: "POST",
    url: `${url}/team/${teamId}/slot/${slot}`,
    body: pokemon,
    headers: { Authorization: `${token_type} ${token}` },
    failOnStatusCode: options.failOnStatusCode ?? true,
  });
};

export const updatePokemonSlot = (
  url: string,
  teamId: string,
  slot: number,
  pokemon: any,
  token_type: string,
  token: string,
  options: { failOnStatusCode?: boolean } = {}
) => {
  return cy.request({
    method: "PUT",
    url: `${url}/team/${teamId}/slot/${slot}`,
    body: pokemon,
    headers: { Authorization: `${token_type} ${token}` },
    failOnStatusCode: options.failOnStatusCode ?? true,
  });
};

export const removePokemonFromSlot = (
  url: string,
  teamId: string,
  slot: number,
  token_type: string,
  token: string,
  options: { failOnStatusCode?: boolean } = {}
) => {
  return cy.request({
    method: "DELETE",
    url: `${url}/team/${teamId}/slot/${slot}`,
    headers: { Authorization: `${token_type} ${token}` },
    failOnStatusCode: options.failOnStatusCode ?? true,
  });
};

export const deleteTeam = (
  url: string,
  teamId: string,
  token_type: string,
  token: string,
  options: { failOnStatusCode?: boolean } = {}
) => {
  return cy.request({
    method: "DELETE",
    url: `${url}/team/${teamId}`,
    headers: { Authorization: `${token_type} ${token}` },
    failOnStatusCode: options.failOnStatusCode ?? true,
  });
};
