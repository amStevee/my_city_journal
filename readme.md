TRAVEL JOURNAL
this journal helps one to save and share his/her travel experence with the world while letting them have a peack at other people travel journal /if public. it also allow you comment on peoples article

<!-- DATABASE -->

Create an Author model that store detailes about each user such as:
{index[id], firstname, lastname, middlename?, index[username], email, password, following[] created@, updated@}
Each user should have an article[] attached to them
every atticle should include:
{id, title, location, description, rating, isPublic, Comments[
{id, comment, articleId[relating to it's article]}
], image, userId[relating to it's Author]}
`NOTE: the image in this case should be stored on an S3 buket`
An article image can be an array of images or just an image.

<!-- IMPLIMENTATION -->

using prisma to create all modals [Author, Articles, Comments]
npx prisma init
npx prisma migrate dev --name init

<!-- .......................................................................................................................... -->

<!-- API -->

Let users Register to the travel_journal by sending their {firstname, lastname, middlename?, index[username], email, password} recieved from the frontend to the 
Author Table.

    GET a general list of isPublic Journal articles.
    Filter result by location or year.

if user is loged in (has token(JWT))
Let the User POST an article about the place he/she have visited.
Allow user to UPDATE the description should there be any mistake.
GET a list of all the places the User have visited.

every possibble ERROR sinario should be take care of using a middleware.

    client request to the API should be limited so as to avoid BFA.

    TRY to make every response delivered under 6s where Applicable.

npm i cors dotenv express jsonwebtoken multer ts-loader ts-node uuid bcrypt @prisma/client

npm i typescript

npm i -D nodemon @types/node @types/uuid concurrently prisma webpack webpack-cli @types/cors @types/dotenv @types/express @types/jsonwebtoken @types/nodemon
