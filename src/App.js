import { useState, useEffect } from "react";
import CardList from "./components/card-list/CardList.component";
import SearchBox from "./components/search-box/SearchBox.component";

import logo from "./logo.svg";
import "./App.css";

const App = () => {

  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [title, setTitle] = useState('');

  // We only want it to happen once. So what needs to go inside of this array? Well, nothing. We don't ever want to trigger this callback ever again other than the very first time the app mounts. So for that reason, we pass it an empty array as the dependency array. We're essentially saying to this use effect Hey, the only time you should ever call this function is on Mount, because if any of the dependencies change, use effect is going to call this function. But I'm passing, you know, dependencies, which means that nothing is ever going to change. So nothing should ever trigger you to recall this function ever again. Other than the very first time when the function mounts.
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => setMonsters(users));
  }, []);

  const onSearchChange = (event) => {
    const serachFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(serachFieldString);
  };

  const onTitleChange = (event) => {
    const serachFieldString = event.target.value.toLocaleLowerCase();
    setTitle(serachFieldString);
  };

  const filterMonsters = monsters.filter((monsterName) => {
    return monsterName.name.toLocaleLowerCase().includes(searchField);
  });

  return (
    <div className="App">
      <h1 className="app-title">{title}</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="search monster"
        className="monsters-search-box"
      />
      <br></br>
      <SearchBox
        onChangeHandler={onTitleChange}
        placeholder="set title"
        className="title-search-box"
      />
      <CardList monsters={filterMonsters} />
    </div>
  );
};

export default App;
