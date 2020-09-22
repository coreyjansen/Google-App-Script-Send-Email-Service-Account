/*
 * This sample demonstrates how to configure the library for Google APIs, using
 * domain-wide delegation (Service Account flow).
 * https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority
 */
//https://github.com/gsuitedevs/apps-script-oauth2/blob/master/samples/GoogleServiceAccount.gs
//https://github.com/gsuitedevs/apps-script-oauth2


// Private key and client email of the service account.
var PRIVATE_KEY =
    '-----BEGIN PRIVATE KEY-----\n\n-----END PRIVATE KEY-----\n';
var CLIENT_EMAIL = 'XXXXXXXXXXXXXXXXXXXX.gserviceaccount.com';
// Email address of the user to impersonate.


/**
 * Authorizes and makes a request to the Google Drive API.
 */
function sendEmailGmailAPI(email) {
  var USER_EMAIL = email.sender;
  var ccEmailString = "";
  var service = getGmailService(USER_EMAIL);
  if (service.hasAccess()) {
    var url = "https://www.googleapis.com/gmail/v1/users/" + USER_EMAIL + "/messages/send";
    var token = service.getAccessToken();
    var subject = email.subject;
    var emails = email.recipient.split(",");
    var comma;
    var receiverEmail = "";
    for (var i = 0; i < emails.length; i++) {
      comma = "";
      if (i > 0) {
        comma = " ,";
      }
      receiverEmail += comma + "" + emails[i] + "";
    }

    var USER_NAME = email.sendername;
    var htmlbody = email.htmlbody;
    var ccEmail = email.cc;
    if (email.hasOwnProperty("cc")) {
      ccEmailString = "\r\nCC: <" + ccEmail + ">";
    }

    var raw = GQ.base64Encode("From: " + USER_NAME + " <" + USER_EMAIL + ">" + "\r\nTo: " + receiverEmail + ccEmailString + "\r\nSubject: " + subject + "\r\nMIME-Version: 1.0\r\nContent-Type:text/html; charset=utf-8/r/n\r\n\n" + htmlbody);
    var payload = JSON.stringify({raw: raw});

    var options = {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
      method: "POST",
      payload: payload,
    };
    var response = UrlFetchApp.fetch(url, options);
    Logger.log(response.getContentText());
    var result = JSON.parse(response.getContentText());
    Logger.log(JSON.stringify(result, null, 2));
  } else {
    Logger.log(service.getLastError());
  }
}

/**
 * Reset the authorization state, so that it can be re-tested.
 */
function reset() {
  getGmailService().reset();
}

/**
 * Configures the service.
 */
function getGmailService(USER_EMAIL) {

  return OAuth2.createService('Gmail:' + USER_EMAIL)
      // Set the endpoint URL.
      .setTokenUrl('https://oauth2.googleapis.com/token')

      // Set the private key and issuer.
      .setPrivateKey(PRIVATE_KEY)
      .setIssuer(CLIENT_EMAIL)

      // Set the name of the user to impersonate. This will only work for
      // Google Apps for Work/EDU accounts whose admin has setup domain-wide
      // delegation:
      // https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority
      .setSubject(USER_EMAIL)

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getScriptProperties())

      // Set the scope. This must match one of the scopes configured during the
      // setup of domain-wide delegation.
      .setScope('https://www.googleapis.com/auth/gmail.send');
}
