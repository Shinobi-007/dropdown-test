const DropdownList = ({ name, info, getData, setID }) => {
  return (
    <select
      onChange={(e) => {
        setID(e);
        getData(e.target.value);
      }}
      className='dropdown-list'
    >
      <option key={null} value=''>
        All {name}
      </option>
      {info.map((e) => {
        return (
          <option key={e.id} value={e.id}>
            {e.speaker || e.name + ` (${e.shiurCount})`}
          </option>
        );
      })}
    </select>
  );
};
export default DropdownList;
