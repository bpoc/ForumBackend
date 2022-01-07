import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import {schema} from "@ioc:Adonis/Core/Validator";

export default class UsersController {
    public async index({}: HttpContextContract) {}

    public async store({request, response}: HttpContextContract) {
        //create the schema
        const newUserSchema = schema.create({
            email: schema.string({trim: true}),
            password: schema.string(),
        });

        //validate the request with the schema
        //if it fails it will automatically send an error to the user
        const requestBody = await request.validate({schema: newUserSchema});

        //get the email and password
        const email = requestBody.email;
        const password = requestBody.password;

        //check to see if the user already exists
        //we don't want to try to create the same user twice
        const currentUser = await User.findBy("email", email);
        if (currentUser !== null) {
            response.badRequest("user already exists");
            return;
        }

        //populate a new user with data
        const newUser = new User();
        newUser.email = email;
        newUser.password = password;

        //save it to the database
        await newUser.save();

        //return the new user
        return newUser;
    }

    public async show({params, bouncer, response, auth}: HttpContextContract) {
        //make sure id was passed into the params
        if (params.id === null) {
            return response.badRequest("id expected in params");
        }
        //this will check the Authorization header to see if the user is authenticated or not
        await auth.use("api").authenticate();
        //this will get the user or fail if the id is invalid
        const userToView = await User.findOrFail(params.id);
        //we use bouncer to determine that the logged in user can view this information
        await bouncer.authorize("viewUser", userToView);
        //lastly we can return the user
        return userToView;
    }

    public async update({}: HttpContextContract) {}

    public async destroy({}: HttpContextContract) {}

    public async login({request, auth}: HttpContextContract) {
        //create the schema for this request
        const loginSchema = schema.create({
            email: schema.string({trim: true}),
            password: schema.string(),
        });

        //validate the request
        const userInfo = await request.validate({schema: loginSchema});

        //attempt to generate a token
        const token = await auth.use("api").attempt(userInfo.email, userInfo.password, {expiresIn: "1day"});
        return token;
    }
}
