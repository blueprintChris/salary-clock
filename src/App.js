import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tempSalary, setTempSalary] = useState(0);
  const [salary, setSalary] = useState(0);

  const [salaryPerSecond, setSalaryPerSecond] = useState(0);
  const [accumulatedSalary, setAccumulatedSalary] = useState(0);
  const [payday, setPayday] = useState(0);
  const [payDate, setPayDate] = useState(null);

  const [error, setError] = useState('');

  useEffect(() => {
    const countSalary = setInterval(() => {
      const newAccumulatedSalary = accumulatedSalary + salaryPerSecond;
      setAccumulatedSalary(newAccumulatedSalary);
    }, 1000);

    return () => clearInterval(countSalary);
  }, [accumulatedSalary, salaryPerSecond]);

  const calculateSalaryPerSecond = salary => {
    const salaryPerWeek = +salary / 52;
    const salaryPerDay = salaryPerWeek / 7;
    const salaryPerHour = salaryPerDay / 24;
    const salaryPerMinute = salaryPerHour / 60;
    const salaryPerSec = salaryPerMinute / 60;

    return salaryPerSec;
  };

  const calculateSecondsSinceDate = payday => {
    const t2 = new Date();
    const dif = t2.getTime() - payday.getTime();

    const secondsDifference = dif / 1000;

    return secondsDifference;
  };

  const getLastPayday = payday => {
    const today = new Date();
    const payDate = new Date();

    if (!payday) {
      return new Date();
    }

    if (today.getDate() < payday) {
      payDate.setDate(0);
    }

    payDate.setDate(payday);
    payDate.setHours(0, 0, 0, 0);

    return payDate;
  };

  const handleSetSalary = () => {
    if (parseInt(tempSalary)) {
      setAccumulatedSalary(0);
      setSalary(+tempSalary);
      setError('');

      const lastPayday = getLastPayday(payday);
      const secondsSinceDate = calculateSecondsSinceDate(lastPayday);
      const salaryPerSec = calculateSalaryPerSecond(+tempSalary);
      const accumulatedToDate = salaryPerSec * secondsSinceDate;

      setAccumulatedSalary(accumulatedToDate);
      setSalaryPerSecond(salaryPerSec);
      setPayDate(lastPayday);
    } else {
      setError('Salary must be a number');
    }
  };

  return (
    <div className='App'>
      <div>
        <label htmlFor='input-salary'>Annual salary</label>
        <input type='text' name='input-salary' onChange={e => setTempSalary(e.target.value)} placeholder='i.e. 25000' />
      </div>
      <div>
        <label htmlFor='input-payday'>Monthly payday</label>
        <input type='text' name='input-payday' onChange={e => setPayday(e.target.value)} placeholder='day of month, i.e. 28' />
      </div>
      <div></div>
      <button onClick={handleSetSalary}>Calculate</button>
      <div>
        {salary ? (
          <span>
            You earn <strong>£{salary}</strong> a year.
          </span>
        ) : null}
      </div>
      <div>{payDate && `Your payday is on the ${payday} of each month`}</div>
      {accumulatedSalary ? (
        <>
          <div>
            You earn (roughly) <strong>£{salaryPerSecond.toFixed(4)}</strong> a second, over a 24-hour period.
          </div>
          <div>
            You have accumulated <strong>£{accumulatedSalary && accumulatedSalary.toFixed(4)}</strong> since{' '}
            <strong>{payDate && `${payDate.toLocaleDateString()}`}</strong>
          </div>
        </>
      ) : (
        <span>Hit calculate to see your earnings $$$$</span>
      )}
      <div>{error && error}</div>
    </div>
  );
}

export default App;
