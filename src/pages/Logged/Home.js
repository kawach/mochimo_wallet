import {connect, useSelector} from "react-redux";
import {Card} from "../../components/Card";

const Home = () => {

    const wallet = useSelector(({wallet}) => wallet)

    return wallet.balances ? (
        <div className={"box"}>
            <h1> Balances </h1>
            {
               wallet.many_balances > 0 ? Object.entries(wallet.balances).map((value, index)=>{
                   return <Card balance={value}/>
               }) : ("")
            }
        </div>
    ) : (
        <div className={"box"}>
            <p> no balances </p>
        </div>
    )
}

export default connect(null, null)(Home)