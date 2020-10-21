import React from 'react';

import {
    Link
} from 'react-router-dom';

export const Users = ({users}) => { 
    const getTableOfUsers = (users) => {
        return users.map(user => 
            <tr key={user.id}>
                <td>
                    <Link to={`/users/${user.id}`}>
                        {user.name}
                    </Link>
                </td>
                <td>{!!user.blogs ? user.blogs.length : 0}</td>
            </tr>
        );
    };
    return (
        <>
            <h3>Users</h3>
            <table>{getTableOfUsers(users)}</table>
        </>
    );
};