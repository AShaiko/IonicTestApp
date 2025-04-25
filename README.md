# IonicTestApp
Test task for the position of Angular developer.

## Task 
Setup Angular project last version. Add git to the project and use it often, commits are important. Implement next functionality:
Create a simple layout that needs to contain a name and logo.
Apps need to have an authentication system in app. Users should be able to register and login with username and password. (In angular use NGXS or NGRX for saving data, if you decide to use Ionic, use Ionic Storage).
Create a currency converter page. After successfully login, users need to be redirected to this page. On this page you need to have input for amount an button to trigger action. For converting use this API https://app.freecurrencyapi.com/dashboard . Result of converting should be saved in the list.
All navigation need to be done in ionic.
To create a currency page implement some popular HTML/CSS framework like Bootstrap, Bulma, Material.
Page need to be responsive and to look nice on mobile device also.

## Technologies

**Frontend**:
Angular CLI: 19.2.9
Node: 20.17.0
npm 10.8.2,
Angular Material,
TypeScript,
SCSS,
Ionic
**Backend**:
.NET 8,
ASP.NET Core Web API,
Entity Framework Core
Database: SQLite
**Currency Conversion API**:
[FreeCurrencyAPI](https://app.freecurrencyapi.com/)

## Run the project

### Frontend

1. Navigate to the frontend directory:

    cd ui

2. Install necessary dependencies:

    npm i

3. Build the Angular project. The app will be generated in necessary backend folder:

    npm run build

### Backend

4. Open solution IonicTestApp/IonicTestApp.sln by VisualStudio

5. Run the database migrations:

    dotnet ef database update

After first run the local sqlite database will be created on the path IonicTestApp/app.db.

6. Run the project. It can be run by VisualStudio or command:  dotnet build


The application will be opened by https://localhost:5001/#/login adress. 

This information is actual on April, 2025.