const uuid = require('uuid/v1');
const storage = require('../utils/storage');

const posts = [];

const resolvers = {
    Query: {
        posts: () => posts,
    },

    Mutation: {
        async addPost(parent, { post }) {
            const { picture, description} = post;
            
            const { createReadStream, mimetype } = await picture
            const stream = createReadStream();

            const { path } = await storage.upload({ stream, mimetype });
            
            const newPost = {
                id: uuid(),
                picture: path,
                description: description,
                claps: 0,
                createdAt: new Date().toISOString()
            };

            posts.push(newPost);

            return newPost;
        },

        addClap(parent, { postId }) {
            const index = posts.findIndex((element) => element.id == postId);

            if (index != -1) {
                posts[index].claps += 1;
                return posts[index];
            }

            return null;
        }
    },
};

module.exports = { resolvers }
