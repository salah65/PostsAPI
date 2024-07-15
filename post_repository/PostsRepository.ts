import { getFormattedDate } from "../utils/timeUtils";
import { Post } from "../entities/Post";
import { nanoid } from 'nanoid';
import { readFromFile, writeToFile } from "../db/dataManager";



export function readAllPostsByDateSortedByVotes(fileName: string): Post[] {
    return readFromFile(fileName).sort((a, b) => b.votes - a.votes);
}
export function createNewPost(title: string, body: string) {
    const newPost = new Post(nanoid(), title, body);
    const fileName = getFormattedDate(newPost.creation_date);
    const allposts: Post[] = readFromFile(fileName);
    const updatedPosts = [...allposts, newPost];
    writeToFile(fileName, updatedPosts);

}
export function voteUpById(postId: string, fileName: string) {
    const allposts: Post[] = readFromFile(fileName);
    if (allposts.length) {
        const updatedPosts = allposts.map(post => post.id === postId ? { ...post, votes: post.votes + 1 } : post);
        writeToFile(fileName, updatedPosts);
    }
}
export function voteDownById(postId: string, fileName: string) {
    const allposts: Post[] = readFromFile(fileName);
    if (allposts.length) {
        const updatedPosts = allposts.map(post => post.id === postId ? { ...post, votes: post.votes - 1 } : post);
        writeToFile(fileName, updatedPosts);
    }
}
