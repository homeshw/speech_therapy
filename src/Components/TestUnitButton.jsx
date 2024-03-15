export const TestUnitButton = ({name, img,style, onClick}) => {


    return (
        <button className="test-button" style={style} onClick={onClick}>
            {/* <img src={img}></img> */}
            <label>{name}</label>
        </button>
    )
} 