import {useState} from "react";

const Login = (props) => {
    const [selected, setSelected] = useState()
    const [file, setFile] = useState()
    const [input, setInput] = useState()

    const handleClick = (event) => {
        switch (event.target.id) {
            case "submit" : {
                event.target.classList.toggle("is-loading")
                let reader = new FileReader()
                reader.readAsText(file)
                reader.onload = () => {
                    // console.log(test.result)
                }
                event.target.classList.toggle("is-loading")
            }
        }
    }

    const handleInput = (event) => {
        event.target.files ? setFile(event.target.files[0]) : setInput(event.target.value)
    }

    return (
        <section className="hero">
            <div className="hero-body">
                <div className={"box"}>
                    <div className="tabs">
                        <ul onClick={handleClick}>
                            <li><a id={"file"}>File</a></li>
                            <li><a id={'other'}>Other method</a></li>
                            <li><a id={'recovery'}>Mnemonic phrase</a></li>
                        </ul>
                    </div>
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
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input" type="password" placeholder="********" onChange={handleInput}
                                   id={"input"}/>
                        </div>
                    </div>
                    <button className="button is-primary" onClick={handleClick} id={"submit"}>Sign in</button>
                </div>
            </div>
        </section>
    )
}

export {Login}