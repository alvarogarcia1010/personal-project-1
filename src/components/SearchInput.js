import React, {useState} from 'react'
import {Form, InputGroup, FormControl, Button} from 'react-bootstrap';

const SearchInput = (props) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const onEnterKeyPress = (event) => {
    if(event.key === 'Enter')
    {
      event.preventDefault();
      onSearch();
    }
  }

  const onSearch = () => {
    props.onSearch(search)
  }

  return (
    <Form inline className="mr-4">
      <FormControl 
        value={search}
        onChange={handleSearchChange}
        onKeyPress={onEnterKeyPress}
        type="text" 
        placeholder={props.placeholder}
        className="mr-sm-2" 
      />
      <Button variant="outline-light" className="d-none d-sm-block" onClick={onSearch}>Buscar</Button>
    </Form>
  )
}

export default SearchInput;
