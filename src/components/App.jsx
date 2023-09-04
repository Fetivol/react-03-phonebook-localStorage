import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Phonebook } from './Phonebook/Phonebook';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addToContacts = contact => {
    const existingContact = this.state.contacts.find(
      c =>
        c.name.toLowerCase() === contact.name.toLowerCase() ||
        c.number === contact.number
    );

    if (existingContact) {
      alert('Contact already exists!');
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, { id: nanoid(), ...contact }],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleChange = filter => {
    this.setState({
      filter,
    });
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const jsonParse = JSON.parse(contacts);
    if (jsonParse !== null) {
      this.setState({ contacts: jsonParse });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;

    const visibleItems = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <Layout>
        <h1>Phonebook</h1>
        <Phonebook onAdd={this.addToContacts}></Phonebook>
        <h2>Contacts</h2>
        <Filter
          filter={this.state.filter}
          onChange={this.handleChange}
        ></Filter>

        {visibleItems.length > 0 ? (
          <ContactsList
            componentsData={visibleItems}
            onDelete={this.deleteContact}
          ></ContactsList>
        ) : (
          <span>We didn't find this person</span>
        )}

        <GlobalStyle />
      </Layout>
    );
  }
}
