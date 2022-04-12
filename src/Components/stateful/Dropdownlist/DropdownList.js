import './DropdownList.css';
import dropdownIcon from '../../../Assets/Images/dropdown-icon.png';
import FilterOption from '../FilterOption/FilterOption.js';
import { useState } from 'react';

const DropdownList = (props) => {
  const [isListActive, setIsListActive] = useState(false);
  const filters = ['created at', 'test', 'Henaf'];

  return (
    <>
      <section className="dropdown">
        <div
          id={
            props.region === '' ? 'remove-filter-box hide' : 'remove-filter-box'
          }
        >
          <p onClick={() => {}}>
            {props.region === '' ? 'Remove filter: ' + props.region : ''}
          </p>
        </div>
        <section className="dropdown-list">
          <h4>Filter by region</h4>
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
          {filters.map((region, index) => {
            return (
              <FilterOption
                nameValue={region}
                region={props.region}
                onClick={props.onClick}
                displayByRegion={props.displayByRegion}
                countries={props.countries}
                isListActive={isListActive}
                setIsListActive={setIsListActive}
                key={index}
              />
            );
          })}
        </section>
      </section>
    </>
  );
};

export default DropdownList;
