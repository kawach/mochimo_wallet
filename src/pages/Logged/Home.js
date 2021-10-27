import {connect, useSelector} from "react-redux";
import _ from "lodash";

const Home = () => {

    const wallet = useSelector(({wallet}) => wallet)
    return wallet.balances ? (
        <div className={"box"}>
            {wallet.balances ? console.log(wallet.balances) : "no balances"}
        </div>
    ) : (
        <div className={"box"}>
            <p> no balances </p>
        </div>
    )
}

export default connect(null,null)(Home)