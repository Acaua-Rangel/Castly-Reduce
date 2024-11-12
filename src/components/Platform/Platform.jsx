import Progress from '../Progress/Progress';
import './Platform.css';;

function Platform({plat, amount=20}) {
    return (
        <div className='platf'>
            <h4 className="font-medium text-black dark:text-white">{plat.name}</h4>
            <Progress amount={amount} kbps={plat.amount}/>
        </div>
    )
}

export default Platform