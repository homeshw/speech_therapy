export const TestUnitButton = ({name, img,style, onClick}) => {


    return (
        <button className="default-button test-button" style={style} onClick={onClick}>
            {/* <img src={img}></img> */}
            <label>{name}</label>
        </button>
    )
} 