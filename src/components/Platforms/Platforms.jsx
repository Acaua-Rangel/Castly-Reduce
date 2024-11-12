import Platform from "../Platform/Platform";
import './Platforms.css';

function Platforms({ plats, amount = 20 }) {
    return (
        <div className="plats-container">
            {plats.map((plat, index) => (
                <Platform key={plat.id || index} plat={plat} amount={amount}/>
            ))}
        </div>
    );
}

export default Platforms;
