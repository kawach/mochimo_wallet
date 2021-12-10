import {connect, useSelector} from "react-redux";
import Balance from "../../Views/Logged/Balance";

const Home = (props) => {

    const wallet = useSelector(({wallet}) => wallet)
    return wallet.balances ? (
        <>
            <h1 className={"title"}> Balances </h1>
            {
               wallet.many_balances > 0 ? Object.entries(wallet.balances).map((value, index)=>{
                   return <Balance balance={value} key={value[1].id} index={index}/>
               }) : ("")
            }
        </>
    ) : (
        <div className={"box"}>
            <p> no balances </p>
        </div>
    )
}

export default connect(null, null)(Home)