import React from 'react';

export const User = (user) => {
    return (
    <div>
        <span>{user.name}</span>
        <span>{user.blogs.length}</span>    
    </div>)
}