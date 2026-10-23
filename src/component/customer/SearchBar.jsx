

const SearchBar = ({value, onChange}) => {
  return (
    <div>
        <input 
            type="text" 
            className="input" 
            placeholder="Search..." 
            value={value}
            onChange={onChange}
        />
    </div>
  )
}

export default SearchBar