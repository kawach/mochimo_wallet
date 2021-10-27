const Textarea = (props) => {
    const {value, handleChange} = props
  return (
      <div className="field">
          <label className="label">You're seed</label>
          <div className="control">
              <textarea className="textarea" placeholder="Textarea" value={value} onChange={handleChange}/>
          </div>
      </div>
  )
}

export default Textarea