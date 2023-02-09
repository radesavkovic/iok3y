import { useEffect, useState } from "react";
import Slider from '@mui/material/Slider';

const Calculator = () => {
    const [sliderValue, setSliderValue] = useState('50');
    const [depositAmount, setDepositAmount] = useState('')

    const updateCalc = event => {
        setDepositAmount(event.target.value);
    }
    
    const calculate = event => {
        setSliderValue(event.target.value);
    }

    const calcRate = (days) => {
        let result = depositAmount * 0.025;
        let i = 0;
        for (;i < sliderValue; i++) {
            result = result * 1.025;
        }

        return Number.parseFloat(result * days).toFixed(1);
    }

    return (
        <div className="card">
            <h2>Calculator</h2>
            <p>Minimum  <strong>25 BUSD</strong></p>
            <p className={'marginTop3'}>Stake Amount  <strong></strong></p>
            <p className="center marginTop4">
                <input
                    className={'deposit-amt-btn'}
                    placeholder="Deposit Amount"
                    onChange={updateCalc}
                />
            </p>
            <p className={'marginTop6'}>Days Compounded<strong></strong></p>
            <p className="center marginTop4" style={{ width: '100%' }}>
            <Slider
                                            defaultValue={0}
                                            // min={1}
                                            // max={60}
                                            aria-label="Default"
                                            valueLabelDisplay="auto"
                                            color='primary'
                                            onChange={calculate}
                                            />
                {/* <input type="range" className="customRanger" onChange={calculate} /> */}
            </p>
            <div className='invest-daily marginTop9'>
                <div className="invest-daily-content">
                    <p>$Earning Daily (%)</p>
                    <p className="tbdColor marginTop4 fontBolder">%{"2.5"}</p>
                </div>
                {/*<div className="invest-sep"></div>*/}
                <div className="invest-daily-content">
                    <p>Earning Daily ($)</p>
                    <p className="tbdColor marginTop4 fontBolder"> ${depositAmount * 2.5 / 100}</p>
                </div>
            </div>
            <div className='invest-daily marginTop7'>
                <div className="invest-daily-contentCustom">
                    <p>Daily</p>
                    <p className="tbdColor marginTop3">${calcRate(1)}</p>
                </div>
                {/*<div className="invest-sep"></div>*/}
                <div className="invest-daily-contentCustom">
                    <p>Weekly</p>
                    <p className="tbdColor marginTop3"> ${calcRate(7)}</p>
                </div>
            </div>
            <div className='invest-daily marginTop8'>
                <div className="invest-daily-contentCustom">
                    <p>Monthly</p>
                    <p className="tbdColor marginTop3">${calcRate(30)}</p>
                </div>
                {/*<div className="invest-sep"></div>*/}
                <div className="invest-daily-contentCustom">
                    <p>Yearly</p>
                    <p className="tbdColor marginTop3"> ${calcRate(365)}</p>
                </div>
            </div>
        </div>
    )
}

export default Calculator