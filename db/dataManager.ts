import { appendFileSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { Post } from "../entities/Post";

const DB_POSTS_PATH = join(__dirname, "data");



export function readFromFile(fileName: string): Post[] {
    try {
        const filePath = join(DB_POSTS_PATH, fileName + ".json");
        const data = readFileSync(filePath, 'utf-8');
        const postsArray: Post[] = JSON.parse(data) as Post[];
        return postsArray;
    } catch (err) {
        return [];
    }
}

export function writeToFile(fileName: string, posts: Post[]) {
    try {
        const filePath = join(DB_POSTS_PATH, fileName + ".json");
        const postsAsString = JSON.stringify(posts);
        writeFileSync(filePath, postsAsString);

    } catch (err) {
        console.error(`Error reading file ${fileName}:`, err);

    }
}