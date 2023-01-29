import { useState, useEffect } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import s from '../App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = event => {
    const loweredCase = event.name.toLowerCase().trim();

    const exists = contacts.some(
      contact => contact.name.toLowerCase().trim() === loweredCase
    );

    if (exists) {
      alert(`${event.name} is already in contacts!`);
    } else {
      setContacts([...contacts, event]);
    }
  };

  const addFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const filteredContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  const deleteContact = id => {
    const filtered = contacts.filter(contact => contact.id !== id);
    setContacts(filtered);
  };

  return (
    <section className={s.content}>
      <div className={s.content__container}>
        <ContactForm addContact={addContact} />
        <ContactList contacts={filteredContacts} deleteContact={deleteContact}>
          <Filter filter={filter} addFilter={addFilter} />
        </ContactList>
      </div>
    </section>
  );
};
