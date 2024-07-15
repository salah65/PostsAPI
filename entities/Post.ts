export class Post {
    id: string;
    title: string;
    body: string;
    votes: number;
    creation_date: Date;

    constructor(id: string, title: string, body: string) {
        this.body = body;
        this.id = id;
        this.title = title;
        this.creation_date = new Date();
        this.votes = 0;
    }
}