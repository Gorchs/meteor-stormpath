Package.describe({
  name: 'gorchs:stormpath',
  version: '0.0.1',
  summary: 'OAuth handler for Stormpath',
  git: 'https://github.com/3scale/gorchs-stormpath',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('accounts-ui', ['client', 'server']);
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('service-configuration', ['client', 'server']);
  api.use('http', ['server']);
  api.use('underscore','server');
  api.use('templating', 'client');
  api.use('random', 'client');

  api.export('Stormpath');

  api.addFiles(['stormpath_client.js','stormpath_configure.html', 'stormpath_configure.js'],'client');

  api.addFiles('stormpath_server.js', 'server');
});