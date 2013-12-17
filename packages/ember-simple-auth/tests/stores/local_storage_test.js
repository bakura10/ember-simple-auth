var store;

module('Ember.SimpleAuth.Stores.LocalStorage', {
  setup: function() {
    store = Ember.SimpleAuth.Stores.LocalStorage.create();
  },
  teardown: function() {
    store.clear();
  }
});

test('clears itself', function() {
  store.persist({ key1: 'value1', key2: 'value2' });
  store.clear();

  equal(store.restore().key1, null, 'Ember.SimpleAuth.Stores.LocalStorage deletes all properties when cleared.');
  equal(store.restore().key2, null, 'Ember.SimpleAuth.Stores.LocalStorage deletes all properties when cleared.');
});

test('loads all properties', function() {
  deepEqual(store.restore(), {}, 'Ember.SimpleAuth.Stores.LocalStorage returns an empty plain object when all properties are loaded but the store is empty');

  store.persist({ key1: 'value1', key2: 'value2' });
  deepEqual(store.restore(), { key1: 'value1', key2: 'value2' }, 'Ember.SimpleAuth.Stores.LocalStorage loads all stored properties.');
});

test('saves properties', function() {
  store.persist({ key: 'value' });
  equal(store.restore().key, 'value', 'Ember.SimpleAuth.Stores.LocalStorage saves a property and loads it again.');

  store.persist({ key1: 'value1', key2: 'value2' });
  equal(store.restore().key1, 'value1', 'Ember.SimpleAuth.Stores.LocalStorage saves multiple properties.');
  equal(store.restore().key2, 'value2', 'Ember.SimpleAuth.Stores.LocalStorage saves multiple properties.');
  equal(store.restore().key, 'value', 'Ember.SimpleAuth.Stores.LocalStorage does not destroy previously stored properties when save is called again.');

  store.persist({ key: '' });
  equal(store.restore().key, null, 'Ember.SimpleAuth.Stores.LocalStorage deletes empty properties when saving.');
  equal(localStorage.getItem('ember_simple_auth:key'), null, 'Ember.SimpleAuth.Stores.LocalStorage clears the localStorage object for empty properties when saving.');
});