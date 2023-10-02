export default function Card({ name, id, pic, handleClick }) {

    return (
        <>
            <div className="card" onClick={() => handleClick(id)}>
                <p className="cardName">{name}</p>
                <img src={pic} alt={`${name} image`} className="cardImg"/>
            </div>
        </>
    )
}