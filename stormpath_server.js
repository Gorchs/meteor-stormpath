Stormpath = {};

OAuth.registerService('stormpath', 2, null, function(query) {
  console.log("getting token response");
    var response = getTokenResponse(query);
    console.log("getting identity");
    var identity = getIdentity(response.accessToken);

    console.log("REES",response);
    var serviceData = {
      id: identity.rider_id,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      expiresAt: (+new Date()) + (1000 * response.expiresIn)
    };

    var fields = identity;
    fields.name = identity.first_name + ' ' + identity.last_name

    console.log("return val",{serviceData: serviceData,options: {profile: fields}});
    return {
      serviceData: serviceData,
      options: {
        profile: fields
      }
    };
  });


var getTokenResponse = function (query) {
  console.log("Checking config");
  var config = ServiceConfiguration.configurations.findOne({service: 'stormpath'});
  if (!config)
    throw new ServiceConfiguration.ConfigError();
  console.log("Config ok");
  var response;

  try {
    console.log("making request");
    response = HTTP.post(
      "http://requestb.in/15mgufz1",
      //"https://api.stormpath.com/v1/applications/" + config.Application + "/oauth/token", 
        {
          headers: 
            {
              Accept: 'application/json',
              user: config.APIkey + ":" + config.APIsecret
            },
          params: 
            {
              code: query.code,
              state: query.state,
              grant_type:"password",
              username:"batman",
              password:"Aa12345678"
            }
        }
      );
  } catch (err) {
    throw _.extend(new Error("here  - Failed to complete OAuth handshake with Stormpath. " + err.message),
                   {response: err.response});
    console.log(err.message);
  }

  if (!response.data) { // if the http response was a json object with an error attribute
    console.log("Failed to complete OAuth handshake with Stormpath. " + response.data.error);
  } else {
    console.log("DATA",response.data);
    return {
      accessToken: response.data.access_token,
      expiresIn: response.data.expires_in
    };
  }
};

var getIdentity = function (accessToken) {
  try {
    var response = Meteor.http.get("xxxxxxhttps://api.stormpath.com/v1/applications/"+ config.Application +"/loginAttempts", {
        headers: 
          { 
            Authorization: 'Bearer ' + accessToken 
          }
    });
  } catch (err) {
    throw new Error("Failed to fetch identity from Stormpath. " + err.message);
  }

  if (!response.data) { // if the http response was a json object with an error attribute
    throw new Error("Failed to complete OAuth handshake with Stormpath. " + response.data.error);
  } else {
    console.log(response.data);
    return response.data;
  }
};



Stormpath.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};