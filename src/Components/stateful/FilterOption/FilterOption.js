const FilterOption = (props) => {
  return (
    <div
      className="dropdown-div"
      onClick={() => {
        props.onClick(props.nameValue);
        props.isListActive
          ? props.setIsListActive(false)
          : props.setIsListActive(true);
      }}
    >
      <p>{props.nameValue}</p>
    </div>
  );
};

export default FilterOption;
