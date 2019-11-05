import React, { useState, useEffect } from 'react'
import personService from './service/person-service'
import './index.css'
// //
// Riittää että erotat sovelluksesta kolme komponenttia. Hyviä kandidaatteja ovat esim. filtteröintilomake, uuden henkilön lisäävä lomake, kaikki henkilöt renderöivä komponentti sekä yksittäisen henkilön renderöivä komponentti.

// Sovelluksen juurikomponentti voi näyttää refaktoroinnin jälkeen suunnilleen seuraavalta, eli se ei itse renderöi suoraan oikeastaan mitään muita kuin otsikkoja:

const Message = ({message, style}) => {
  if (message === null || message === 'something happened...') return null;
  if (style === null) style = 'message';

  return (<div className={style}>{message}</div>)
}

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
  const [ errorMessage, setErrorMessage ] = useState(null);
  const [ newMessage, setMessage ] = useState(null);

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
        personService
          .updatePerson(existingPerson.id, {...existingPerson, number: newPhoneNumber})
          .then(updatedPerson => {
              setPersons( persons.map( person => person.id !== updatedPerson.id ? person : updatedPerson ) );
              setNewName('');
              setNewPhoneNumber('');
              setMessage('Person updated!');
              setTimeout(() => setMessage(null), 5000);
          })
          .catch(error => {
            setErrorMessage('Updating person ' + newPerson.name + ' failed. Person is already removed.' );
            setTimeout(() => setErrorMessage(null), 5000);
          });
      }
    } else {
      personService.addPerson(newPerson)
        .then(person => {
          console.log('+++++++')
          setPersons(persons.concat(person));
          setNewName('');
          setNewPhoneNumber('');
          setMessage( 'Person added!' );
          setTimeout(() => setMessage(null), 5000);
        })
    }

  };

  const removePerson = (personId) => {
    if (window.confirm('Haluatko varmasti poistaa?')) {
      personService.deletePerson(personId)
        .then( response => {
          setPersons( persons.filter( person => person.id !== personId ) )
          setMessage( 'Person removed!' );
          setTimeout(() => setMessage(null), 5000);
        } )
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value);
  const handlePhoneNumberChanges = (event) => setNewPhoneNumber(event.target.value);
  const searchTextChangeHandler = (event) => setNewSearchQueryText(event.target.value);

  return (
    <div>
        <h1>Phonebook</h1>
        <Message message={errorMessage} style='error-message' />
        <Message message={newMessage}  style='message' />
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