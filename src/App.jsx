import React, { useState, useEffect } from 'react';

function App() {
  const [list, setList] = useState([]); // Array para guardar las entradas
  const [input, setInput] = useState(''); // Constante para manejar las entradas que se agregan al array
  const [editIndex, setEditIndex] = useState(-1); // El -1 significa que no estamos editando aún

  useEffect(() => {
    if (editIndex !== -1) { // Si Index no es -1 (lo que significa que se esta editando un elemento), muestra una alerta
      alert('Se ha editado un elemento');
    }
  }, [list]); // El efecto se ejecutara cada vez que el valor de este array cambie

  const addItem = () => { // Función flecha sin argumentos "()"
    if (input) { // Si input tiene algún valor 
      setList([...list, input]); // ...list crea una copia de la lista actual y luego se le agrega el input al final
      setInput(''); // Acá se limpia el campo de entrada
    }
  };

  const deleteItem = (index) => { // Tomar como argumento 'index' que es la posición del elemento a eliminar
    // El _ indica que no se usa el primer parametro (el elemento)
    const newList = list.filter((_, i) => i !== index); // Crea una nueva lista que filtra la lista original
    setList(newList); // Setea la lista a la newList
    alert('Se ha eliminado un elemento');
  };

  const editItem = (index) => { // Toma argumento index, el cuál es la posición del elemento a editar
    setEditIndex(index); // Guarda el elemento que se esta editando
    setInput(list[index]); // Esto pone el texto del elemento en el campo de input
  };

  const saveEdit = () => {
    if (input && editIndex !== -1) { // Verifica
      const newList = [...list]; // Crea una copia de la lista actual con ...list
      newList[editIndex] = input; // Actualiza el elemento de la posición editIndex con el nuevo texto del Input
      setList(newList); // Setea la lista con newList
      setInput(''); // Limpia el campo de entrada
      setEditIndex(-1); // Reseta el index de edición a -1, osea ya no estamos editando
      alert('Se ha editado un elemento');
    }
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)} // Actualiza el estado de input cada vez que se escribe algo
        placeholder="Agregar o editar elemento"
      />
      {editIndex === -1 ? ( // Si editIndex es -1 (no editando) muestra el botón "Agregar", si no, muestra "Guardar"
        <button onClick={addItem}>Agregar</button>
      ) : (
        <button onClick={saveEdit}>Guardar</button>
      )}
      <ul>
        {list.map((item, index) => ( // Mapear item (nombre) e index (ID del item)
          <li key={index}>
            {item}
            <button onClick={() => editItem(index)}>Editar</button>
            <button onClick={() => deleteItem(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;