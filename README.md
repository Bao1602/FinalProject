[CSTP1303 High Level Design Detail.docx](https://github.com/user-attachments/files/16436550/CSTP1303.High.Level.Design.Detail.docx)
CSTP1303 
Name: Peter
Section 1: Project Description
-1.1 Project
The project name: e-commerce Final Project CSTP1303
-1.2 Description
Brief overall description of the project:
The project is an e-commerce website with basic functionality, with login and sign up. The website will display items like clothes, games, electronics devices,…etc.
Section 2: Overview
2.1 Purpose
Brief description of the focus of this module of the overall project and its intended audience.
2.2 Scope
The website allows user to login and signup
- after login it will display all items
-allow user to put item into cart
2.3 Requirements
2.3.1 Functional Requirements

Example:
  - Requirement 1 (R1): The website shall allow users to log in using a username and password.
  - Requirement 2 (R2): The website shall allow users to sign up using email, password.
-Requirement 3 (R3): the website shall allow users to put item into cart and display the total in the cart.
2.3.4 Security Requirements
  - Data Encryption: All sensitive data shall be encrypted using bcrypt.
-User Authentication (Check if the user exists in database or not)
2.3.5 Estimates
#	Description	Hrs. Est.
1	Set up website on render	1hr
2	Doing front end for signup and login	3hr
3	Making backend for signup and login
(bcrypt,Mongoatlas,Api,Server)	6hr
4	Making Front end Home page for e-commerce	2hr
5	Making backend for e-commerce page	10hr
	TOTAL:	 Est 22hr 



Section 3: System Architecture
3.1 Overview
-Index.js : sets up basic express application with MongoDB connection using Mongoose,UserRoute, Start the server.
-userRoute : defines the routes for user-related operations such as user registration, login, and fetching user data.
-userControllers: contains the logic for handling user registration, login, and retrieving users.
-userModel: This model represents the structure of user documents in the MongoDB database and provides methods to interact with the database.
-script.js : uses the Fetch API to send HTTP requests to the server and processes the server's responses.
3.2 Architectural Diagrams
 
Section 4: Data Dictionary

Table

Field	     Notes	                          Type
ID	      Unique Identifier from TABLE_SEQ	VARCHAR
NAME	    The Value INPUT from User	        VARCHAR
EMAIL	    The Value output from User	      VARCHAR
PASSWORD	The Value output from User	      VARCHAR

