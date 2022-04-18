const FilterOption = (props) => {
  const {
    state,
    setIsListActive,
    isListActive,
    setIsStateSelected,
    setStateSelected,
  } = props;
  return (
    <div
      className="dropdown-div"
      onClick={() => {
        isListActive ? setIsListActive(false) : setIsListActive(true);
        setStateSelected(state);
        setIsStateSelected(true);
      }}
    >
      <p>{state}</p>
    </div>
  );
};

export default FilterOption;
