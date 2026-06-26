import './Notification.css'

const Notification = ({message}) => {
  if (message === null) return null
  console.log(message);
  return (
    <div className={`notification-${message.color}`}>{message.text}</div>
  )
}

export default Notification
