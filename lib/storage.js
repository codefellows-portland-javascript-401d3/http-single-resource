exports = module.exports;
let i = 0;

const storageArr = [
  {name: `Mike`, id: 0},
  {name: `Arielle`, id: 1}
];
module.exports = storage = {
 
  get(callback) {
    setTimeout(() => {
      callback(storageArr);
    }, 1000);
  },

  getId(pathname, callback) {
    setTimeout(() => {
      console.log(`Made it into getId`);
      let length = pathname.lenth;
      pathname = pathname.slice(7, length);
      storageArr.forEach(note => {
        if(note.id == pathname) {
          callback(note);
        }
      });
    }, 1000);
  },

  add(fields, callback) {
    setTimeout(function(){
      fields.id = i++;
      storageArr.push(fields);
      callback(storageArr);  
    }, 0);
  },

  del(pathname, callback) {
    setTimeout(function(){
      let length = pathname.lenth;
      pathname = pathname.slice(7, length);
      storageArr.forEach(obj => {
        if(obj.id === pathname) {
          storageArr.splice(pathname, 1);
        }
      });
      callback();  
    }, 0);
  },

  put() {

  },

  post() {

  }
};




exports.storage = storage;