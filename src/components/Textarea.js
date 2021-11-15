const Textarea = (props) => {
    const {value,id, onChange} = props
  return (
      <div className="field">
          <label className="label">Mnemonic words</label>
          <div className="control">
              <textarea className="textarea" placeholder="Textarea" value={value} id={id} onChange={onChange}/>
          </div>
      </div>
  )
}

export default Textarea