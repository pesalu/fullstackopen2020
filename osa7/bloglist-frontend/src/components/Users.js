import React from 'react';

export const Users = ({users}) => { 
    const getTableOfUsers = (users) => {
        return users.map(user => 
            <tr>
                <td><a>{user.name}es</a></td>
                <td>{!!user.blogs ? user.blogs.length : 0}</td>
            </tr>
        );
    };
    return (
        <div>
            <h3>Users</h3>
            <table>{getTableOfUsers(users)}</table>
        </div>
    );
};