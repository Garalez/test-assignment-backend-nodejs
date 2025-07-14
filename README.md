# SerVC Test Assignment Backend NodeJS

Just use this repository as a [**template**](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) to generate repo in your account and make an assignment in it.

Create a **new** branch, make the task in it, then make a **Pull Request** to the **main** branch, so we are able to review it and leave some comments if needed.

## Task

Make a CRUD for a bookstore with 5 endpoints:
* **GET** /books - Get array of all books
* **GET** /books/:id - Get one book by ID
* **POST** /books - Create new book
* **PUT** /books/:id - Update book by ID
* **DELETE** /books/:id - Delete book by ID

The backend data exchange format is **JSON**.

Book fields:
- **id**
- **name**
- **isbn**
- **author**
- **releaseDate**

### Extras (optional)
* Separate logic parts in different files - **routes**, **controllers**, **services**, **models**, etc. Decide what will work best for you.
* Add pagination (pagination) - getting a portion of books (for example, 10 books per page) through the query parameter take and skip. For example **GET** `/books?take=10&skip=20` to get ten books starting from 21.
* Add sorting when receiving books. In the GET request for /books, add the query parameter sort to be able to sort by all books. Example **GET** `/books?sort=name:asc,author:desc`.

## Info
There are already premade server with one route (`src/index.ts`) and database model.

It’s **bad** practice to use [*any*](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any) or to not use types at all in typescript, so try to make typings for all your code.

## Useful Links

Typescript object types to make nice typings - https://www.typescriptlang.org/docs/handbook/2/objects.html

TypeORM Entities docs - https://typeorm.io/entities

## Commands
Start development server - `npm run dev`.

Build project - `npm run build`.
