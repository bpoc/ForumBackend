import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import {rules, schema} from "@ioc:Adonis/Core/Validator";
import Topic from "App/Models/Topic";
import Thread from "App/Models/Thread";

export default class ThreadsController {
    public async index({}: HttpContextContract) {}

    public async store({request, auth}: HttpContextContract) {
        //threads require a name a topicId
        const threadSchema = schema.create({
            name: schema.string({trim: true, escape: true}, [rules.minLength(5), rules.maxLength(70)]),
            topicId: schema.number(),
        });
        const threadPayload = await request.validate({schema: threadSchema});
        //make sure the topicId belongs to an actual topic
        const topic = await Topic.findOrFail(threadPayload.topicId);
        const thread = new Thread();
        thread.name = threadPayload.name;
        //this is required because the associate functions below
        //try to insert to the database
        //even though it shouldn't
        thread.userId = auth.user!.id;
        //associate the thread with the topic
        await thread.related("topic").associate(topic);
        //associate the thread with the user that is creating it
        await thread.related("user").associate(auth.user!);

        console.log("thread", thread);
        //save the thread
        await thread.save();
        //load in relations
        await thread.load("user");
        await thread.load("topic");
        return thread;
    }

    public async show({params, response}: HttpContextContract) {
        //we use the preload functions to load in our relationships
        //since we want the posts to also include our users
        //the post preload shows how to do that
        const thread = await Thread.query()
            .preload("user")
            .preload("topic")
            .preload("posts", (builder) => {
                builder.preload("user");
            })
            .where("threads.id", params.id)
            .first();
        //if there is no thread then throw a 404 error
        if (thread === null) {
            response.notFound(`no thread with id ${params.id} exists`);
            return;
        }

        return thread;
    }

    public async update({request, params, bouncer}: HttpContextContract) {
        //get the thread
        const thread = await Thread.findOrFail(params.id);
        const threadSchema = schema.create({
            name: schema.string({trim: true, escape: true}, [rules.minLength(5), rules.maxLength(70)]),
        });
        const threadPayload = await request.validate({schema: threadSchema});
        await bouncer.authorize("updateThread", thread);
        thread.name = threadPayload.name;
        await thread.save();
        return thread;
    }

    public async destroy({params, bouncer}: HttpContextContract) {
        const thread = await Thread.findOrFail(params.id);
        await bouncer.authorize("deleteThread", thread);
        await thread.delete();
        return thread;
    }
}
