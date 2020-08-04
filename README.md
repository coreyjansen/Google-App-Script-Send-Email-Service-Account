
# Google-App-Script-Send-Email-Service-Account
This script allows you to send emails using Google App Script and a domain-wide delegation service account so that the email can come from someone else in your organization rather than just the person who is executing the script. I found this extremely valuable when I am the one setting up automation and triggers but I want them to come from specific people other than myself.

It is required that you create a service account with the proper scopes and to put the credentials from the JSON into the script.

# Creating Service Account:
To create a service account with domain wide delegation use the following walkthrough
[https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority](https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority)

 - Required scope to add to Domain-wide delegation:
	 - `https://www.googleapis.com/auth/gmail.send`
Download the JSON credentials to get the private key and service acccount email address to put into the script

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
