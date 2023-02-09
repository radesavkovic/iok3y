import './amountdetail.css'

import { useEffect, useState } from "react";
import { config } from "../../config";
import { useContractContext } from "../../providers/ContractProvider";
import { useAuthContext } from "../../providers/AuthProvider";

const AmountDetail = () => {
    const { wrongNetwork, getBusdBalance, fromWei, web3, update } = useContractContext();
    const [contractBUSD, setContractBUSD] = useState(0);
    const { chainId } = useAuthContext();

    const fetchContractBUSDBalance = () => {
        if (!web3 || wrongNetwork) {
          setContractBUSD(0);
          return;
        }
        getBusdBalance(config.contractAddress).then((amount) => {
          setContractBUSD(fromWei(amount));
        });
    };

    useEffect(() => {
        fetchContractBUSDBalance();
    }, [web3, chainId, update]);

    return (
        <div className='box'>
            <div className="wrapper full">
                <div className="amount-detail">
                    <div className="amount-detail-cont">
                        <div className="amount-content center">
                            <h2>${contractBUSD}</h2>
                            <p>contract balance</p>
                        </div>
                        <div className="amount-sep"></div>
                        <div className="amount-content center">
                            <h2>2.5%</h2>
                            <p>daily roi</p>
                        </div>
                        <div className="amount-sep"></div>
                        <div className="amount-content center">
                            <h2>30% to 0%</h2>
                            <p>withdraw fee</p>
                        </div>
                        <div className="amount-sep"></div>
                        <div className="amount-content center">
                            <h2>10%</h2>
                            <p>deposit fee</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AmountDetail