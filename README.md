# :bulb: Project: 
# Accommodation Booking Site

# :rocket: Tools:
- **Frontend**: React.js
- **Backend**: Node.js
- **Database**: MongoDB

# :memo: Nota Bene:

- Dockerfiles are written

- npm start from route file will launch both frontend and backend


# Screens:

## Main Page
The website displays a list of available accommodations, with each listing featuring a photo and a brief description. Users can apply filters based on price, size, and type to refine their search. 
Additionally, the login button is only displayed to users who are not currently logged in.

![img.png](img/img.png)

## Detailed Page
When clicking on any accommodation card, a page with details will open.
Card Detailed Page includes:

- Name
- Picture(s)
- Price
- Size
- Address
- Description
- Type

![img_4.png](img/img_4.png)

**Note:** If there are several pictures, the user can use 
**carousel.**

## Login Page
The screen displays a login form with fields to input email and password. 
If a user inserts correct credentials, he or she will be successfully logged in.  
There is validation on each field.

![img_2.png](img/img_2.png)

## Registration Page
Allow a user input email and password. Once saved, the corresponding record 
can be applied to log in to the site.

![img_1.png](img/img_1.png)

## Screen for Logged Users
In addition, if a user is logged, he or she will also see Logout button.
**My Account** section (separate component) should be visible to logged users only. 

![img_3.png](img/img_3.png)

## My Account Page
The user is able to change the current password with a new one. Once submitted, 
a new password will overwrite the old password in MongoDB.

![img_5.png](img/img_5.png)
