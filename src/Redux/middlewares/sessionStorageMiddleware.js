const sessionStorageMiddleware = store => next => action => {
    console.log('Dispatching action:', action);
    const result = next(action);
    console.log('New state:', store.getState());
    sessionStorage.setItem('state', JSON.stringify(store.getState()))
    return result;
  };
  
  export default sessionStorageMiddleware;