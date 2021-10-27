const FileInput = (props) => {

    const {file, handleInput} = props

    return (
        <div className="file has-name is-fullwidth">
            <label className="file-label">
                <input className="file-input" type="file" name="resume" onChange={handleInput}/>
                <span className="file-cta">
                              <span className="file-icon">
                                <i className="fas fa-upload"></i>
                              </span>
                              <span className="file-label">
                                Choose a file…
                              </span>
                            </span>
                <span className="file-name">
                              {file ? file.name : "load wallet file"}
                            </span>
            </label>
        </div>
    )
}

export default FileInput