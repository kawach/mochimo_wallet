const Login = () => {
    return (
        <section className="hero">
            <div className="hero-body">
                <div className={"box"}>
                    <div className="tabs">
                        <ul>
                            <li className={"is-active"}><a>Seed phrase</a></li>
                            <li><a>Other method</a></li>
                            <li><a>Other method</a></li>
                        </ul>
                    </div>
                    <div className="field">
                        <label className="label">You're seed</label>
                        <div className="control">
                            <textarea className="textarea" placeholder="Textarea"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input" type="password" placeholder="********"/>
                        </div>
                    </div>
                    <button className="button is-primary">Sign in</button>
                </div>
            </div>
        </section>
    )
}

export {Login}