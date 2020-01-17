export const getUser = state => state.user;

export const getAdverts = state => state.adverts;

export const getSession = state => getUser(state).isLoggedIn;

export const isUserRegistered = state => {
  const session = getSession(state);
  return !!session;
};

export const getTags = state => getAdverts(state).tags;

export const getAdvert = state => getAdverts(state).advertById;

export const getUpdatedAdvert = state => getAdverts(state).advertUpdated;

export const getCreatedAdvert = state => getAdverts(state).advertCreated;

export const getAdvertById = state => advertId =>
  getAdverts(state).adverts.find(advert => advert._id === advertId);

export const getUi = state => getAdverts(state).ui;
