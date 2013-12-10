var authenticator;

module('Ember.SimpleAuth.Authenticators.OAuth2', {
  setup: function() {
    authenticator = Ember.SimpleAuth.Authenticators.OAuth2.create()
  }
});

test('it restores the session', function() {
  var resolved;
  Ember.run(function() {
    authenticator.restore({ authToken: 'authToken' }).then(function() {
      resolved = true;
    });
  });

  ok(resolved, 'Ember.SimpleAuth.Authenticators.OAuth2 returns a resolving promise when the properties include an authToken on restore.');

  var rejected;
  Ember.run(function() {
    authenticator.restore({}).then(function() { }, function() {
      rejected = true;
    });
  });

  ok(rejected, 'Ember.SimpleAuth.Authenticators.OAuth2 returns a rejecting promise when the properties do not include an authToken on restore.');

  rejected = false;
  Ember.run(function() {
    authenticator.restore({ authToken: '' }).then(function() { }, function() {
      rejected = true;
    });
  });

  ok(rejected, 'Ember.SimpleAuth.Authenticators.OAuth2 returns a rejecting promise when the properties include an empty authToken on restore.');
});