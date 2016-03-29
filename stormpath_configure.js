Template.configureLoginServiceDialogForStormpath.helpers({
  siteUrl: function () {
    return Meteor.absoluteUrl();
  }
});

Template.configureLoginServiceDialogForStormpath.fields = function () {
  return [
    {property: 'APIkey', label: 'API Key'},
    {property: 'APIsecret', label: 'API Secret'},
    {property: 'Application', label: 'Application'},
  ];
};