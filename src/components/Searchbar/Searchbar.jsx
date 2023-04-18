import PropTypes from 'prop-types';
//import { Component } from 'react';
import { useState } from 'react';
//import { toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import { BiSearchAlt2 } from 'react-icons/bi';
import {SearchbarWrapper, SearchbarForm, Searchbarbutton, SearchbarInput, SearchbarLabel } from './Searchbar.styled';

//export class Searchbar extends Component {
   // state = {
      //  name: '',
    //};

    export const Searchbar = ({ onSubmit }) => {
        const [name, setName] = useState('');


// відслідковування input-a
const handleChange = evt => {
  setName(evt.target.value.trim());
  };

  // передача значення зі стейту в App під час сабміту форми
  const onFormSubmit = e => {
    e.preventDefault();
   onSubmit(name);
  };

    return (
<SearchbarWrapper>
    <SearchbarForm onSubmit={onFormSubmit}>
    <Searchbarbutton type="submit">
    <BiSearchAlt2 size="25px" />
        <SearchbarLabel>Search</SearchbarLabel>
    </Searchbarbutton>

    <SearchbarInput
        //class="input"
        type="text"
        //name="searchName"
        //autocomplete="off"
        //autofocus
        placeholder="Search images and photos"
        onChange={handleChange}
        value={name}
    />
    </SearchbarForm>
</SearchbarWrapper>
    );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };