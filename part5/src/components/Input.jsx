const Input = ({ label, type = 'text', value, onChange }) => {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input className="border border-gray-300 rounded-md px-2" type={type} value={value} onChange={onChange} />
    </div>
  );
};

export default Input;
