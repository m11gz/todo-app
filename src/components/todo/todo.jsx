import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form.js';
import { SettingsContext } from '../../context/setting.jsx';
import { AuthContext } from '../../context/auth.jsx';

import { v4 as uuid } from 'uuid';

const ToDo = () => {

  const settings = useContext(SettingsContext);
  const auth = useContext(AuthContext);

  const defaultValues = {
    difficulty: 4,
  }
  const [pages, setPages] = useState([]);
  const [currentPage, updateCurrentPage] = useState(1);
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);


  function handleClick(e) {
    let pageNum = parseInt(e.target.textContent);
    updateCurrentPage(pageNum);
  }

  useEffect(() => {
    let numPages = Math.ceil(list.length / settings.numItems);
    let pageArr = []
    for (let i = 1; i <= numPages; i++) {
      pageArr.push(i);
    }
    setPages(pageArr);
  }, [list.length], [currentPage]);

  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);

  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  return (
    <>
      <header>
        <h1>To Do List: {incomplete} items pending</h1>
      </header>


      <form onSubmit={handleSubmit}>

        <h2>Add To Do Item</h2>

        <label>
          <span>To Do Item</span>
          <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
        </label>

        <label>
          <span>Assigned To</span>
          <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
        </label>

        <label>
          <span>Difficulty</span>
          <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
        </label>

        <label>
          <button type="submit">Add Item</button>
        </label>
      </form>


      <SettingsContext.Consumer>
        {settings => (
          list.map(item => (
            <div key={item.id}>
              <p>{item.text}</p>
              <p><small>Assigned to: {item.assignee}</small></p>
              <p><small>Difficulty: {item.difficulty}</small></p>
              <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
              <hr />
            </div>
          ))
        )}
      </SettingsContext.Consumer>

    </>
  );
};

export default ToDo;
