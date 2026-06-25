const PersonForm = ({cbSubmit, cbName, cbNumber}) => {
  return (
    <form onSubmit={cbSubmit}>
      <div>name: <input onChange={cbName}/></div>
      <div>number: <input onChange={cbNumber}/></div>
      <button type="submit">add</button>
    </form>
  )
}

export default PersonForm
