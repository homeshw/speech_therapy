const WordSelector = ({ words, onSelect }) => {
    return (
      <div>
        {words.map(word => (
          <button key={word} onClick={() => onSelect(word)}>
            {word}
          </button>
        ))}
      </div>
    );
  };

  export default WordSelector;
  