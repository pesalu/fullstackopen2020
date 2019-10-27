import React, { useState } from 'react'


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

  const [ persons, setPersons] = useState([
    { id:1, name: 'Arto Hellas', number: '040-123456' },
    { id:2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id:3, name: 'Dan Abramov', number: '12-43-234345' },
    { id:4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);

  const [ newName, setNewName ] = useState('');
  const [ newPhoneNumber, setNewPhoneNumber ] = useState('');
  const [ newSearchQueryText, setNewSearchQueryText ] = useState('');

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