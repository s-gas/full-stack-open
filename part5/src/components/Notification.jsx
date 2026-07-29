import { CircleCheckBig } from 'lucide-react'

const Notification = ({ children }) => {
  if (!children) return null;
  return (
    <div className="flex items-center justify-center gap-2 bg-green-50 p-2 w-full">
      <CircleCheckBig size={16} />
      {children}
    </div>
  );
};

export default Notification;
