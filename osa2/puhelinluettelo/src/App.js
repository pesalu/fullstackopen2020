import React, { useState, useEffect } from 'react'
import personService from './service/person-service'

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

const Persons = ({persons, removePerson}) => {
  return persons.map((person) => 
    <Person key={person.id} 
            name={person.name} 
            phone={person.number} 
            removePerson={() => removePerson(person.id)}
    />);
}

const Person = ({name, phone, removePerson}) => {
    return (<div>{name} {phone} <button onClick={removePerson}>Poista</button></div>)
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
    personService.getPersons()
        .then(persons => setPersons(persons))
  }
  useEffect(hook, []);

  const filteredPersonList = (persons) => {
    if (!newSearchQueryText) return persons;
    return persons.filter(person => person.name.toLowerCase().includes(newSearchQueryText) || person.number.toLowerCase().includes(newSearchQueryText));
  }

  const addPerson = (event) => {
    event.preventDefault(); 
    
    let newPerson = {
        name: newName,
        number: newPhoneNumber,
    };

    let existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      if (window.confirm('Haluatko muuttaa puhelinnumeron?')) {
        personService.updatePerson(existingPerson.id, {...existingPerson, number: newPhoneNumber})
          .then(updatedPerson => {
              setPersons( persons.map( person => person.id !== updatedPerson.id ? person : updatedPerson ) );
              setNewName('');
              setNewPhoneNumber('');
          });
      }
    } else {
      personService.addPerson(newPerson)
        .then(person => {
            setPersons(persons.concat(person));
            setNewName('');
            setNewPhoneNumber('');
        })
    }

  };

  const removePerson = (personId) => {
    if (window.confirm('Haluatko varmasti poistaa?')) {
      personService.deletePerson(personId)
        .then( response => setPersons( persons.filter( person => person.id !== personId ) )
      )
    }
  }

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
        <Persons persons={filteredPersonList(persons)} removePerson={removePerson}></Persons>
    </div>
  )

}

export default App