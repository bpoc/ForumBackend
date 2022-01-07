/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";
import UsersController from "App/Controllers/Http/UsersController";

Route.post("/users/login", (ctx) => {
    return new UsersController().login(ctx);
}).as("users.login");

Route.resource("users", "UsersController").apiOnly().except(["destroy", "update", "index"]);

Route.resource("topics", "TopicsController").apiOnly().middleware({"*": "auth"});

Route.resource("threads", "ThreadsController").apiOnly().except(["index"]).middleware({"*": "auth"});

Route.resource("posts", "PostsController").apiOnly().except(["index"]).middleware({"*": "auth"});
