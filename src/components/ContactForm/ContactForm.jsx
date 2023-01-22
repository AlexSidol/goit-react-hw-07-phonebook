import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addNewContact } from 'redux/operation';
import { selectContacts } from 'redux/selectors';

import css from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleChange = evt => {
    const { name, value } = evt.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'phone':
        setPhone(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    const isInContacts = contacts.find(
      contact => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      toast.info(`${name} is already in contacts.`);
      return;
    }

    const newContact = { name, phone };

    const action = addNewContact(newContact);
    dispatch(action);
    reset();
  };

  const reset = () => {
    setName('');
    setPhone('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.form__label}>
        Name
        <input
          value={name}
          className={css.form__input}
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          placeholder="Olesia Sidolaka"
        />
      </label>
      <label className={css.form__label}>
        Number
        <input
          value={phone}
          className={css.form__input}
          onChange={handleChange}
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="906-02-02"
        />
      </label>
      <button className={css.input__button} type="submit">
        Add contact
      </button>
    </form>
  );
}
