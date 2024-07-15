import { RequestHandler } from "express";
import { createNewPost, readAllPostsByDateSortedByVotes, voteDownById, voteUpById } from "../post_repository/PostsRepository";
import { getFormattedDate } from "../utils/timeUtils";

export const get_All_Posts_ByDate_Handler: RequestHandler = function (req, res, next) {
    const date = req.params.date;
    const posts = readAllPostsByDateSortedByVotes(date);
    if (posts.length)
        return res.status(200).send(posts);
    else
        return res.status(404).send({ error: "Not Found" });

};

export const create_new_post_Handler: RequestHandler<any, any, { "title": string, "body": string; }, any> = function (req, res, next) {
    const { title, body } = req.body;
    if (title || body) {
        createNewPost(title, body);
        return res.status(201).send({ msg: "Post created Successfully" });
    }
    else
        return res.status(400).send({ error: "Bad Input" });
};

export const update_post_votes_Handler: RequestHandler<any, any, { "id": string, "isVoteup": boolean; }, any> = function (req, res, next) {
    let date = req.params.date;
    const { id, isVoteup } = req.body;
    if (typeof id !== 'string' || typeof isVoteup !== 'boolean') {
        return res.status(400).send({ error: "Bad Input" });
    }
    const posts = readAllPostsByDateSortedByVotes(date);
    if (!posts.find(post => post.id === id))
        return res.status(400).send({ error: `Bad Input this id not found` });
    if (!posts.length)
        date = getFormattedDate(new Date());
    if (isVoteup) {
        voteUpById(id, date);
    } else {
        voteDownById(id, date);
    }
    return res.status(200).send({ status: "ok" });

};