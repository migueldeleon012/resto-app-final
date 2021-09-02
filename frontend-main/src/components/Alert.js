import { useSelector } from 'react-redux';

const Alert = () => {
  const message = useSelector((state) => state.message);

  return (
    <div className={`alert ${message.background} ${message.show}`}>
      <p>{message.msg}</p>
    </div>
  );
};

export default Alert;
