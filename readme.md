**TRAVEL JOURNAL**
~~~~
This journal helps one save and share his/her travel experences with the world while letting them have a peack at different mervelous sites from other public journal (if isPublic). it also allow you comment on peoples article, sharing your thought and experience with them.

<!-- DATABASE -->
**DATABASE SECTION**
~~~~
The database would be created with that intent of storing important data from the user such as user details, article from user, comments, etc. the main aim of this database is to make data speedly and readly availiable to the users when needed while maintaining the security of the user data.
- Create an Author model that store detailes    about each user such as:
    {index[id], firstname, lastname, middlename?, index[username], email, password, following[] created@, updated@}
- Each user should have an article[] attached to them.
- Every atticle should include:
    {id, title, location, description, rating, isPublic, Comments[
    {id, comment, articleId[relating to it's article]}
    ], image, userId[relating to it's Author]}.

`NOTE: The image in this case should be stored on an S3 buket`

- An article image can be an array of images or just an image.

<!-- IMPLIMENTATION -->

using prisma to create all modals [Author, Articles, Comments]

    npx prisma init
    npx prisma migrate dev --name init

<!-- .......................................................................................................................... -->

<!-- API -->
**API SECTION**
~~~~

- Let users Register to the travel_journal by sending their {firstname, lastname, middlename?, index[username], email, password} recieved from the frontend to the 
Author Table.

- GET a general list of isPublic Journal articles.
    
- Filter result by location.

- if user is loged in (has token(JWT))
Let the User POST an article about the place he/she have visited.
- Allow user to UPDATE the description.
- GET a list of all the places the User have visited.

- Every possibble ERROR sinario should be taken care of using a middleware.

- Client request to the API should be limited so as to avoid BFA.

- Try to make every response delivered under 6s where Applicable.

Packages:

    npm i typescript    &&

    npm i cors dotenv express jsonwebtoken multer ts-loader ts-node uuid bcrypt @prisma/client express-rate-limit

    &&

    npm i -D nodemon @types/node @types/uuid concurrently prisma webpack webpack-cli @types/cors @types/dotenv @types/express @types/jsonwebtoken @types/nodemon


