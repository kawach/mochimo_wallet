import {connect, useSelector} from "react-redux";

const Home = () => {

    const wallet = useSelector(({wallet}) => wallet)

    return (
        <div className={"box"}>
            {wallet.balances ? "show balances there" : "no balances"}
        </div>
    )
}

export default connect(null,null)(Home)