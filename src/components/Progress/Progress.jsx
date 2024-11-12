import './Progress.css';

function Progress({ amount, kbps, color = '#68d14f' }) {
    let por = kbps / 9000;
    let green = Math.round(amount * por);

    if (green > amount) {
        green = amount;
    } else if (green < 0) {
        green = 0;
    }
    const white = amount - green;

    var rows = [];

    for (var i = 0; i < green; i++) {
        rows.push(
            <div
                key={`green-${i}`} // Adicionando chave única
                className='proce'
                style={{
                    backgroundColor: color,
                    height: '20px',
                    width: '10px'
                }}
            />
        );
    }

    for (var i = 0; i < white; i++) {
        rows.push(
            <div
                key={`white-${i}`} // Adicionando chave única
                className='white'
                style={{
                    backgroundColor: color,
                    height: '20px',
                    width: '10px'
                }}
            />
        );
    }

    return (
        <div className='prog'>
            <div className='progs items-center'>{rows}</div>
            <p className="font-medium text-black dark:text-white">{kbps} Kbps</p>
        </div>
    );
}

export default Progress;
