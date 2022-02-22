import { useEffect, useState } from 'react';
import { StyledAccumulation, StyledAccumulationValue, StyledContentWrapper, StyledInputWrapper } from './styles';
import './App.css';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import Error from './components/Error/Error';

function App() {
  const [salary, setSalary] = useState(0);
  const [payday, setPayday] = useState(0);

  const [salaryPerSecond, setSalaryPerSecond] = useState(0);
  const [accumulatedSalary, setAccumulatedSalary] = useState(0);

  const [payDate, setPayDate] = useState(null);

  const [error, setError] = useState('');

  useEffect(() => {
    const countSalary = () => {
      const newAccumulatedSalary = accumulatedSalary + salaryPerSecond;
      setAccumulatedSalary(newAccumulatedSalary);
    };

    const countSalaryInterval = setInterval(() => {
      countSalary();
    }, 1000);

    return () => clearInterval(countSalaryInterval);
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

    console.log(payday);

    if (today.getDate() < payday) {
      payDate.setDate(0);
    }

    payDate.setDate(payday);
    payDate.setHours(0, 0, 0, 0);

    return payDate;
  };

  const handleSetSalary = () => {
    if (isNaN(salary) || !salary) {
      setError('Salary must be a number');
      return;
    }

    if (isNaN(payday) || !payday) {
      setError('Payday must be a number');
      return;
    }

    if (payday > 31 || payday < 0) {
      setError('Payday must be a number between 0 - 31');
      return;
    }

    setError('');
    setAccumulatedSalary(0);

    const lastPayday = getLastPayday(+payday);
    const secondsSinceDate = calculateSecondsSinceDate(lastPayday);
    const salaryPerSec = calculateSalaryPerSecond(+salary);
    const accumulatedToDate = salaryPerSec * secondsSinceDate;

    setAccumulatedSalary(accumulatedToDate);
    setSalaryPerSecond(salaryPerSec);
    setPayDate(lastPayday);
  };

  return (
    <div className='App'>
      <h1>./Salary Clock</h1>
      <StyledInputWrapper className='input-wrapper'>
        <Input name='input-salary' type='text' label='Enter your annual salary' handleChange={e => setSalary(e.target.value)} placeholder='eg. 25000' />
        <Input name='input-payday' type='text' label='Enter your monthly payday' handleChange={e => setPayday(e.target.value)} placeholder='eg. 28 (or 0)' />
        <Button handleClick={handleSetSalary} label='Calculate' />
      </StyledInputWrapper>
      {accumulatedSalary ? (
        <StyledContentWrapper className='content-wrapper'>
          <StyledAccumulation className='accumulation-wrapper'>
            <span>You have accumulated</span>
            <StyledAccumulationValue className='accummulation-value'>£{accumulatedSalary && accumulatedSalary.toFixed(4)}</StyledAccumulationValue>
            <span>
              since <strong>{payDate && `${payDate.toLocaleDateString()}`}</strong>
            </span>
          </StyledAccumulation>
          <div className='earnings-wrapper'>
            You earn (roughly) <strong>£{salaryPerSecond.toFixed(4)}</strong> every single second of every single day.
          </div>
        </StyledContentWrapper>
      ) : null}
      {error && <Error>{error}</Error>}
    </div>
  );
}

export default App;
