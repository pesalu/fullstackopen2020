import React from 'react';

export const User = ({user}) => {
    if (!user) return null;
    return (
    <div>
        <div>
            <h2>{user.name}</h2>
        </div>
        <div>
            <h3>Added blogs</h3>
            <ul>
                {!!user.blogs ? user.blogs.map(
                    blog => <li key={blog.id}>{blog.title}</li>
                ) : null}
            </ul>
        </div>
    </div>)
}