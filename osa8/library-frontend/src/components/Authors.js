import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import Select from 'react-select';

import { ALL_AUTHORS, UPDATE_BIRTHYEAR } from '../queries';

const Authors = (props) => {

  const [ name, setName ] = useState('');
  const [ birthyear, setBirthyear ] = useState(0);

  const result = useQuery(ALL_AUTHORS)

  const [ updateBirthyear ] = useMutation(UPDATE_BIRTHYEAR, 
    {refetchQueries: [{query: ALL_AUTHORS}]});

  if(result.loading) {
    return <div>loading... </div>
  }

  if (!props.show) {
    return null
  }

  const authors = result.data.allAuthors;

  const options = 
   authors.map(author => {
     return {
       value: author.name,
      label: author.name
    }
    });

  const submit = async (event) => {
    event.preventDefault();

    updateBirthyear({ variables: { name, birthyear: parseInt(birthyear) }})

    setBirthyear(0);
    setName('');
  }
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>
              name
            </th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

{      props.canEdit && <form onSubmit={submit}>
        <div>
          <h3>Set birthyear</h3>
          <Select
            defaultValue={name}
            onChange={({value}) => { 
              setName(value)}}
            options={options}
          />
          <div>
            birthyear: 
            <input type="number"
              value={birthyear}
              onChange={({target}) => setBirthyear(target.value)} />
          </div>
          <button type='submit'>Update</button>
        </div>
      </form>}

      <div>
      </div>
    </div>
  )
}

export default Authors
