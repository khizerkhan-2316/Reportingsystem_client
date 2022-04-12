import './Searchbar.css';
import searchbarIcon from '../../../Assets/Images/searchbar_icon.png';
import clearQueryIcon from '../../../Assets/Images/clear_query.png';
const Searchbar = ({
  setSearchInput,
  searchInput,
  placeholder,
  clearQuery,
}) => {
  const searchHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const isInputEmpty = () => {
    return searchInput === '' ? true : false;
  };
  return (
    <section className="searchbar-container">
      <img
        onClick={clearQuery}
        src={isInputEmpty() ? searchbarIcon : clearQueryIcon}
        alt="search"
      />
      <input
        type="text"
        className="input_field"
        placeholder={placeholder}
        onChange={searchHandler}
        value={searchInput}
      />
    </section>
  );
};

export default Searchbar;
