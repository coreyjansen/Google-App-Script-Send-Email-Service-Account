
# Google-App-Script-Send-Email-Service-Account
This script allows you to send emails using Google App Script and a service account so that the email can come from someone else in your organization. It is required that you create a service account with the proper scopes and to put them in the code.

# Creating Service Account:
To create a service account with domain wide delegation use the following walkthrough
[https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority](https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority)

 - Required scope to add to Domain-wide delegation:
	 - `https://www.googleapis.com/auth/gmail.send`
# Required Libraries:

 **OAuth2**

 1. Go to Resources > Libraries
 2. Add a Library  `1B7FSrk5Zi6L1rSxxTDgDEUsPzlukDsi4KGuTMorsTQHhGBzBkMun4iDF` with the latest version
 3. Click Save

# Example Code:

     var email = {};  
      email.subject = "Test Subject";
      email.recipient = "hello@gmail.com";
      email.htmlbody = "Hello there, this is an example of how to send a <strong> HTML Email </strong>";
      email.sendername="";
      email.sender = "email@domain.com";
      email.sendername = "Corey Jansen"
      email.cc="cc@domain.com";
      sendEmailGmailAPI(email);
