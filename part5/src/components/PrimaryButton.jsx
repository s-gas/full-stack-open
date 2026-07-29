const PrimaryButton = ({children, ...props}) => {
  return (
    <button
      className="border border-gray-300 rounded-md px-4 py-1 cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
