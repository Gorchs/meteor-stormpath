'use strict';

/**
 * Define the base object namespace. By convention we use the service name
 * in PascalCase (aka UpperCamelCase). Note that this is defined as a package global (boilerplate).
 */
Stormpath = {};

/**
 * Request Stormpath credentials for the user (boilerplate).
 * Called from accounts-stormpath.
 *
 * @param {Object}    options                             Optional
 * @param {Function}  credentialRequestCompleteCallback   Callback function to call on completion. Takes one argument, credentialToken on success, or Error on error.
 */
Stormpath.requestCredential = function(options, credentialRequestCompleteCallback) {
  /**
   * Support both (options, callback) and (callback).
   */
  if (!credentialRequestCompleteCallback && typeof options === 'function') 
  {
    credentialRequestCompleteCallback = options;
    options = {};
  } 
  else if (!options) 
  {
    options = {};
  }

  /**
   * Make sure we have a config object for subsequent use (boilerplate)
   */
  const config = ServiceConfiguration.configurations.findOne({service: 'stormpath'});

  if (!config) 
  {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError());
    return;
  }

  /**
   * Boilerplate
   */
  const credentialToken = Random.secret();
  const loginStyle = OAuth._loginStyle('stormpath', config, options);

  /**
   * Stormpath requires AppId
   * We use state to roundtrip a random token to help protect against CSRF (boilerplate)
   */
  /*const loginUrl = 'https://api.stormpath.com/v1/applications/'+ config.AppId +'/authTokens/'
    '?type=basic' +
    '&value=' + 
    '&client_id=' + config.clientId +
    '&state=' + OAuth._stateParam(loginStyle, credentialToken);*/

    var loginUrl =
        //'https://api.stormpath.com/v1/applications/'+ config.Application +'/oauth/token'+
        'http://requestb.in/15mgufz1?'+
        'grant_type=password' +
        '&username='+"batman"+
        '&password='+"Aa12345678";


  /**
   * Client initiates OAuth login request (boilerplate)
  */
  OAuth.launchLogin({
    loginService: 'stormpath',
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken,
    popupOptions: {
      height: 600
    }
  });
};