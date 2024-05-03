const Entry = ({persons, clickHandler}) => 
    persons.map(p => {
      return (
      <li key={p.id}>
        {p.name} {p.number} <button onClick={() => clickHandler(p.id)}>delete</button>
      </li>
      )  
    })

export default Entry