const Tax = () => {
  const data = [
    {
      days: 'Upto 5',
      percent: '30%'
    },
    {
      days: '6 to 10',
      percent: '25%'
    },
    {
      days: '11 to 15',
      percent: '20%'
    },
    {
      days: '16 to 20',
      percent: '15%'
    },
    {
      days: '21 to 25',
      percent: '10%'
    },
    {
      days: '26 to 30',
      percent: '5%'
    },
    {
      days: 'After 30',
      percent: 'No tax'
    }
  ]
  return (
    <div className="card">
      <h2>WITHDRAWAL TAX SCHEDULE</h2>
      <div className='tax-cont'>
        {data.map(i => (
          <>
            <div className="tax-detail">
              <p>{i.days} claims</p>
              <p>{i.percent}</p>
            </div>
            <div className="tax-progress"></div>
          </>
        ))}
      </div>
    </div>)
}

export default Tax