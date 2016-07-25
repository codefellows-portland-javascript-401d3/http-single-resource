// let storeData = [];
// let ids = {};
// let id_stack = 0;

module.exports = class Store {
  constructor() {
    this.data = [];
    this.id_stack = 0;
  }

  getAll() {
    return fakeAsync( () => {
      return {msg:'success', data: this.data};
    });
  }

  get(id) {
    return fakeAsync( () => {
      const index = this.data.findIndex( u => u.id == id);
      if (index > -1) return {msg:'success', data: this.data[index]};
      else return {msg:'fail', data: null};
    });
  }

  add(data) {
    return fakeAsync( () => {
      data['id'] = this.id_stack++;
      const index = this.data.push(data) - 1;
      return {msg:'success', data: this.data[index]};
    });
  }

  update(id, data) {
    return fakeAsync( () => {
      const index = this.data.findIndex( u => u.id == id);
      if (index > -1) {
        this.data[index] = data;
        return {msg:'success', data: this.data[index]};
      } else {
        return {msg:'fail', data: data}; 
      }
    });
  }

  delete(id) {
    return fakeAsync( () => {
      const index = this.data.findIndex( u => u.id == id);
      if (index > -1) {
        let data = this.data.splice(index,1);
        return {msg:'success', data: data};
      } else {
        return {msg:'fail', data: null};
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
