module.exports = class Store {
  constructor() {
    this.data = [];
    this.id_stack = 0;
  }

  getAll() {
    return fakeAsync( () => {
      return this.data;
    });
  }

  get(id) {
    return fakeAsync( () => {
      const index = this.data.findIndex( u => u.id == id);
      if (index > -1) return this.data[index];
      else Promise.reject({id: id});
    });
  }

  add(data) {
    return fakeAsync( () => {
      data['id'] = this.id_stack++;
      const index = this.data.push(data) - 1;
      return this.data[index];
    });
  }

  update(id, data) {
    return fakeAsync( () => {
      const index = this.data.findIndex( u => u.id == id);
      if (index > -1) {
        this.data[index] = data;
        return this.data[index];
      } else {
        return Promise.reject(data);
      }
    });
  }

  delete(id) {
    return fakeAsync( () => {
      const index = this.data.findIndex( u => u.id == id);
      if (index > -1) {
        const data = this.data.splice(index,1);
        return data[0];
      } else {
        return Promise.reject({id: id});
      }
    });
  }

  length() {
    return fakeAsync( () => {
      return this.data.length;
    });
  }
};

function fakeAsync(callback) {
  return new Promise((resolve) => {
    setTimeout( () => {resolve(callback());}, 50);
  });
};
