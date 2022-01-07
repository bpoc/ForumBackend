import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import {schema, rules} from "@ioc:Adonis/Core/Validator";
import Topic from "App/Models/Topic";

export default class TopicsController {
    public async index({}: HttpContextContract) {
        const topics = await Topic.query().preload("user").orderBy("created_at");
        return topics;
    }

    public async store({request, auth}: HttpContextContract) {
        //create our schema we want a name and a description
        const topicsSchema = schema.create({
            name: schema.string({}, [rules.maxLength(50), rules.minLength(3)]),
            description: schema.string({}, [rules.maxLength(500), rules.minLength(3)]),
        });
        //validate the schema
        const payload = await request.validate({schema: topicsSchema});
        const newTopic = new Topic();
        newTopic.name = payload.name;
        newTopic.description = payload.description;
        //associate the topic with the user that is creating it
        await newTopic.related("user").associate(auth.user!);
        //save the new topic to the database
        await newTopic.save();
        //load in the user information
        await newTopic.load("user");
        return newTopic;
    }

    public async show({params}: HttpContextContract) {
        const topic = await Topic.findOrFail(params.id);
        await topic.load("user");
        await topic.load("threads");
        return topic;
    }

    public async update({bouncer, request, params}: HttpContextContract) {
        //create schema because we are updating both name and description are optional
        const updateSchema = schema.create({
            name: schema.string.optional({trim: true, escape: true}, [rules.maxLength(50), rules.minLength(3)]),
            description: schema.string.optional({trim: true, escape: true}, [rules.maxLength(500), rules.minLength(3)]),
        });
        const updatePayload = await request.validate({schema: updateSchema});
        //get the topic
        const topic = await Topic.findOrFail(params.id);
        //verify the user made the topic
        await bouncer.authorize("updateTopic", topic);
        //update the values
        topic.name = updatePayload.name ?? topic.name;
        topic.description = updatePayload.description ?? topic.description;
        //save the topic
        await topic.save();
        //load in the user
        await topic.load("user");
        return topic;
    }

    public async destroy({params, bouncer}: HttpContextContract) {
        let topic = await Topic.findOrFail(params.id);
        await bouncer.authorize("deleteTopic", topic);
        await topic.delete();
        return topic;
    }
}
