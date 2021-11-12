const About = () => {

    return (
        <section className="hero">
            <div className="hero-body">
                    <div className={"box"}>
                        <div className="block">
                            This is a Javascript Wallet for Mochimo blockchain. As there is no backend, we don't
                            store you're
                            mnemonic words so we can't recover them. Please mind to download you're wallet
                        </div>
                        <div className="block">
                            This been built using React.<br/>
                            Huge thanks to <strong>NickP05</strong> who have helped me to understand cryptography
                            things and identify the data<br/>
                            Thanks <strong>Chrisdigity</strong> and <strong>Ortis</strong> for helping me when i had
                            transaction issue and for the endpoint<br/>
                        </div>
                        <div className="block">
                            Please if you see any error can you report it on discord directly at me : <strong>@Easy
                            Peasy#6972</strong>
                        </div>
                </div>
            </div>
        </section>
    )
}

export {About}