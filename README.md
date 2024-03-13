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
Clicking on any accommodation card opens a detailed page for that listing, which includes the following information:

- Name
- Picture(s)
- Price
- Size
- Address
- Description
- Type

![img_4.png](img/img_4.png)

This layout ensures users have all the essential details at their fingertips, facilitating an informed decision-making process.

**Note:** If there are several pictures, the user can use 
**carousel.**

## Login Page

Upon accessing the platform, users are greeted with a user-friendly login interface, designed to facilitate secure and straightforward access. This interface includes two primary fields: one for the user's email address and another for their password. To proceed, users are required to fill in these fields with their credentials. Successful entry of the correct credentials grants the user access to their account, seamlessly integrating them into the platform's ecosystem.

Moreover, to enhance user experience and ensure data integrity, the system implements robust validation checks on each input field. These checks are meticulously designed to verify the accuracy and format of the data provided by the user. For the email field, the validation ensures that the input adheres to the standard email format, while the password field checks may include criteria such as minimum length and the inclusion of both alphanumeric and special characters. These validations are crucial for maintaining the platform's security standards and providing users with guidance should their inputs fall short of the requirements. Through this comprehensive approach, the platform not only safeguards user accounts but also streamlines the login process, making it as efficient and user-friendly as possible.

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
