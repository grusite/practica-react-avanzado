export const getSession = state => state.user.isLoggedIn;

export const isUserRegistered = state => {
  const session = getSession(state);
  return !!session;
};

export const getTags = state => state.tags;

export const getAdverts = state => state.adverts;

export const getAdvert = state => advertId =>
  getAdverts(state).find(advert => advert._id === advertId);

export const getUi = state => state.ui;
