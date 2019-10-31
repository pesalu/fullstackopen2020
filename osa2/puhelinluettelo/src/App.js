import React, { useState, useEffect } from 'react'
import axios from 'axios'


// //
// Riittää että erotat sovelluksesta kolme komponenttia. Hyviä kandidaatteja ovat esim. filtteröintilomake, uuden henkilön lisäävä lomake, kaikki henkilöt renderöivä komponentti sekä yksittäisen henkilön renderöivä komponentti.

// Sovelluksen juurikomponentti voi näyttää refaktoroinnin jälkeen suunnilleen seuraavalta, eli se ei itse renderöi suoraan oikeastaan mitään muita kuin otsikkoja:


const Filter = ({searchTextChangeHandler, newSearchQuery}) => {
    return (
        <div>
            Filter: <input value={newSearchQuery} onChange={searchTextChangeHandler}></input>
        </div>
    )
}

const Persons = ({persons}) => {
    return persons.map((person) => <Person key={person.id} name={person.name} phone={person.number}></Person>);
}

const Person = ({name, phone}) => {
    return (<div>{name} {phone}</div>)
}

const PersonForm = ({submissionHandler, handleNameChange, handlePhoneNumberChanges, newName, newPhoneNumber}) => {
    return (
        <form onSubmit={submissionHandler}>
            <div>
                name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
                number: <input value={newPhoneNumber} onChange={handlePhoneNumberChanges}/>
            </div>
            <div>
                <button type="submit" >add</button>
            </div>
        </form>
    );

}


const App = () => {

  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newPhoneNumber, setNewPhoneNumber ] = useState('');
  const [ newSearchQueryText, setNewSearchQueryText ] = useState('');

  const hook = () => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
  }
  useEffect(hook, []);

  const filteredPersonList = (persons) => {
    if (!newSearchQueryText) return persons;
    return persons.filter(person => person.name.toLowerCase().includes(newSearchQueryText) || person.number.toLowerCase().includes(newSearchQueryText));
  }
  const addPerson = (event) => {
    event.preventDefault();

    if (persons.find(person => person.name === newName)) {
        window.alert(`${newName} is already added to phonebook!`);
        return;
    }

    let newPerson = {
        name: newName,
        number: newPhoneNumber,
        id: persons.length + 1,
    };

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewPhoneNumber('');
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handlePhoneNumberChanges = (event) => setNewPhoneNumber(event.target.value);
  const searchTextChangeHandler = (event) => setNewSearchQueryText(event.target.value);

  return (
    <div>
        <h1>Phonebook</h1>
        <h2>Search by name or number</h2>
        <Filter searchTextChangeHandler={searchTextChangeHandler} newSearchQuery={newSearchQueryText}></Filter>
        <h2>Add new person</h2>
        <PersonForm submissionHandler={addPerson} 
                    handleNameChange={handleNameChange} 
                    handlePhoneNumberChanges={handlePhoneNumberChanges} 
                    newName={newName} 
                    newPhoneNumber={newPhoneNumber}>
        </PersonForm>
        <h2>Persons</h2>
        <Persons persons={filteredPersonList(persons)}></Persons>
    </div>
  )

}

export default App