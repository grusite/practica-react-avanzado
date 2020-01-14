export const getSession = state => state.user.isLoggedIn;

export const isUserRegistered = state => {
  const session = getSession(state);
  return !!session;
};

export const getTags = state => state.adverts.tags;

export const getUser = state => state.user;

export const getAdverts = state => state.adverts;

export const getAdvert = state => getAdverts(state).adverts[0];

export const getUi = state => state.adverts.ui;
