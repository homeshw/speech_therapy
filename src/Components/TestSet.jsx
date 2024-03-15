export const TestSet = ({img,style, onClick}) => {


    return (
        <button className="test-button" style={style} onClick={onClick}>
            <img src={img}></img>
        </button>
    )
} 