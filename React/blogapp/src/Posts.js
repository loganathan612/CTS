import React, { Component } from 'react';
import Post from './Post';

class Posts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            error: null
        };
    }

    loadPosts() {

        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(data => {

                const postList = data.map(
                    item => new Post(item.id, item.title, item.body)
                );

                this.setState({
                    posts: postList
                });

            })
            .catch(error => {

                this.setState({
                    error: error
                });

            });
    }

    componentDidMount() {
        this.loadPosts();
    }

    componentDidCatch(error, info) {

        alert("Error : " + error);

        console.log(info);
    }

    render() {

        return (

            <div>

                <h1>Blog Posts</h1>

                {
                    this.state.posts.map(post => (

                        <div key={post.id}>

                            <h2>{post.title}</h2>

                            <p>{post.body}</p>

                            <hr />

                        </div>

                    ))
                }

            </div>

        );

    }

}

export default Posts;