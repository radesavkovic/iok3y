import copyIcon from '../../../assets/images/copy.png'

import { useEffect, useState } from "react";
import { useContractContext } from "../../../providers/ContractProvider";
import { useAuthContext } from "../../../providers/AuthProvider";
import { config } from "../../../config";

const Refer = () => {
    const { contract, wrongNetwork, fromWei, web3, updateInfo, update } = useContractContext();
    const { address, chainId } = useAuthContext();

    const[refInfo, setRefInfo] = useState({
        earned: 0,
        withdrawn: 0,
    });

    const fetchRefInfo = async () => {
        if (!web3 || wrongNetwork || !address) {
          setRefInfo({
            earned: 0,
            withdrawn: 0,
          });

          return;
        }
    
        try {
          const [earnedAmount, withdrawnAmount] = await Promise.all([
            contract.methods
              .getTotalRefBonus(address)
              .call()
              .catch((err) => {
                console.error("refBonus", err);
                return 0;
              }),
            contract.methods
              .getRefWithdrawn(address)
              .call()
              .catch((err) => {
                console.error("refWithdrawn", err);
                return 0;
              }),
          ]);

          console.log("REF", earnedAmount, withdrawnAmount);

          setRefInfo({
            earned: fromWei(`${earnedAmount}`),
            withdrawn: fromWei(`${withdrawnAmount}`),
          });
        } catch (err) {
            console.error(err);
            setRefInfo({
              earned: 0,
              withdrawn: 0,
            });
          }
      };

      const claim = async () => {
        try {
          await contract.methods.withdrawRef().send({
            from: address
          });
        } catch (err) {
          console.error(err);
        }

        // fetchRefInfo();
        updateInfo();
      };

      useEffect(() => {
        fetchRefInfo();
      }, [address, web3, chainId, update]);
      
    return (
        <div className="card">
            <h2>Refer</h2>
            <p className="marginTop20"></p>
            <div className="card-btns ">
                <p>Earned: <strong>${refInfo.earned}</strong></p>
                <p>Withdrawn: <strong>${refInfo.withdrawn}</strong></p>
            </div>
            <p className="center marginTop15">
                <button onClick={claim} className={'cartButtons'}>Claim</button>
            </p>
            <p className="marginTop13"
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={copyIcon} alt="" className='copy-icon' />
                <span type="button" onClick={() => navigator.clipboard.writeText("https://iok3y.io/megamine?ref="
                                    + address
                                )}>Copy Link</span>
            </p>
            <hr className={'marginTop13'} />
            <a href={config.scanLink} target='_blank'>
            <p className={'marginTop10 tbdColor'}><strong style={{ fontSize: "25px" }}>Smart Contract</strong></p>
            </a>
            <a href="/AuditReportOfIOK3Y.pdf" target='_blank'>
            <p className={'marginTop10 tbdColor'}><strong style={{ fontSize: "25px" }}>Audits</strong></p>
            </a>
            <p className={'marginTop10'}><strong style={{ fontSize: "20px" }}>FYI :</strong><br/><br/>No Withdrawal tax on refers.<br/><br/>10% LVL 1 Referral</p>
            <p ></p>
            {/* <div className="card-btns ">
                <p className={'tw'}> <strong>LOGO</strong></p>
                <p className={'tw'}> <strong>LOGO</strong></p>
            </div> */}
        </div>
    )
}

export default Refer