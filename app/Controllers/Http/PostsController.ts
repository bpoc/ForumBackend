import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import {rules, schema} from "@ioc:Adonis/Core/Validator";
import Thread from "App/Models/Thread";
import Post from "App/Models/Post";

export default class PostsController {
    public async index({}: HttpContextContract) {}

    public async store({request, auth}: HttpContextContract) {
        const postSchema = schema.create({
            text: schema.string({trim: true}, [rules.minLength(5), rules.maxLength(1000)]),
            threadId: schema.number(),
        });
        const postPayload = await request.validate({schema: postSchema});
        const thread = await Thread.findOrFail(postPayload.threadId);
        const post = new Post();
        post.text = postPayload.text;
        post.threadId = thread.id;
        await post.related("user").associate(auth.user!);
        await post.save();
        await post.load("user");
        return post;
    }

    public async show({params}: HttpContextContract) {
        const post = await Post.findOrFail(params.id);
        await post.load("user");
        await post.load("thread");
        return post;
    }

    public async update({bouncer, params, request}: HttpContextContract) {
        const postSchema = schema.create({
            text: schema.string({trim: true}, [rules.minLength(5), rules.maxLength(500)]),
        });
        const postPayload = await request.validate({schema: postSchema});
        const post = await Post.findOrFail(params.id);
        await bouncer.authorize("updatePost", post);
        post.text = postPayload.text;
        await post.save();
        return post;
    }

    public async destroy({params, bouncer}: HttpContextContract) {
        const post = await Post.findOrFail(params.id);
        await bouncer.authorize("deletePost", post);
        await post.delete();
        return post;
    }
}
