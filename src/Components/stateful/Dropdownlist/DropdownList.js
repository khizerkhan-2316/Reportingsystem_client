import './DropdownList.css';
import dropdownIcon from '../../../Assets/Images/dropdown-icon.png';
import FilterOption from '../FilterOption/FilterOption.js';
import { useState } from 'react';

const DropdownList = (props) => {
  const {
    setIsStateSelected,
    setStateSelected,
    isStateSelected,
    stateSelected,
  } = props;
  const [isListActive, setIsListActive] = useState(false);
  const filters = ['Active', 'Inactive'];

  return (
    <>
      <section className="dropdown">
        <div
          id={!isStateSelected ? 'remove-filter-box hide' : 'remove-filter-box'}
        >
          <p
            onClick={() => {
              setIsStateSelected(false);
              setStateSelected(null);
            }}
          >
            {isStateSelected ? 'Remove filter: ' + stateSelected : ''}
          </p>
        </div>
        <section className="dropdown-list">
          <h4>Filter by state</h4>
          <img
            src={dropdownIcon}
            alt="Dropdown list icon"
            onClick={() => {
              if (isListActive) {
                setIsListActive(false);
              } else {
                setIsListActive(true);
              }
            }}
          />
        </section>

        <section
          className={
            isListActive ? 'dropdown-content show' : 'dropdown-content hide'
          }
          id="myDropdown"
        >
          {filters.map((state, index) => {
            return (
              <FilterOption
                state={state}
                setStateSelected={setStateSelected}
                setIsStateSelected={setIsStateSelected}
                key={index}
                isListActive={isListActive}
                setIsListActive={setIsListActive}
              />
            );
          })}
        </section>
      </section>
    </>
  );
};

export default DropdownList;
