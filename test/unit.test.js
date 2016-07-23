const chai = require(`chai`);
const storage = require(`../lib/storage`);
const assert = chai.assert;



describe(`storage functionality`, () => {
 
  it(`gets the storage arr`, (done) => {
    storage.get((storageArr) => {
      assert.equal(storageArr[1].id, `1`);
      done();
    });
  });

  it(`gets information based on id`, (done) => {
    let pathname = `/notes/1`;
    storage.getId(pathname, note => {
      assert.equal(note.id, `1`);
      done();
    });
  });

  it(`adds to the storage`, (done) => {
    let fields = {name: `Bradski`};
    // let i = 1;
    storage.add(fields, (storageArr) => {
      assert.deepEqual(storageArr[2], { name: `Bradski`, id: 3 });
      done();
    });
  });

  it(`deletes a resource from the storage`, (done) => {
    let pathname = `/notes/0`;
    storage.del(pathname, (storageArr) => {
      assert.deepEqual(storageArr[0], { name: `Arielle`, id: 1 });
    });
    done();
  });
//come back to this
  
  it(`changes a current object on put`, (done) => {
    let pathname = `/notes/0`;
    let fields = {name: `Superwoman`};
    storage.put(fields, pathname, (storageArr) => {
    });
    done();
  });
  
}); 