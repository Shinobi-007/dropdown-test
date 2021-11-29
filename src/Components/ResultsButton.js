const ResultsButton = (props) => {
  return (
    <button className='results-btn' onClick={props.getResults}>
      Search
    </button>
  );
};

export default ResultsButton;
