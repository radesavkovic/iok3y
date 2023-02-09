
import { useEffect, useState } from "react";
import axios from "axios";
import { useContractContext } from "../../../providers/ContractProvider";
import { useAuthContext } from "../../../providers/AuthProvider";
import Slider from '@mui/material/Slider';

const Claim = () => {
    const { contract, wrongNetwork, fromWei, web3, updateInfo, update } = useContractContext();
    const { address, chainId } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [rewards, setRewards] = useState('0.000');

    const [userInfo, setUserInfo] = useState({
      dailyRewards: 0,
      withdrawn: 0,
      withdrawable: 0,
      checkpoint: 0,
      claimCount: 0,
    });

    const[claimTime, setClaimTime] = useState({
      lastClaim: '??',
      nextClaim: '??',
    });

    const fetchUserInfo = async () => {
        if (!web3 || wrongNetwork || !address) {
          setUserInfo({
            dailyRewards: 0,
            withdrawn: 0,
            withdrawable: 0,
            checkpoint: 0,
            claimCount: 0,
          });

          setClaimTime({
            lastClaim: '??',
            nextClaim: '??',
          });

          return;
        }
    
        try {
          const value = await contract.methods.Users(address).call().catch((err) => {
            console.error("get_user_info", err);
            return 0;
          });
          // const [depositAmount, withdrawAmount, claimedAmount, checkTime] = await Promise.all([
          //   contract.methods
          //     .getDepositAmount(address)
          //     .call()
          //     .catch((err) => {
          //       console.error("depositAmount", err);
          //       return 0;
          //     }),
          //   contract.methods
          //     .getWithdrawInfo(address)
          //     .call()
          //     .catch((err) => {
          //       console.error("withdrawAmount", err);
          //       return 0;
          //     }),
          //   contract.methods
          //     .getClaimedAmount(address)
          //     .call()
          //     .catch((err) => {
          //       console.error("claimedAmount", err);
          //       return 0;
          //     }),
          //   contract.methods
          //     .getClaimedTime(address)
          //     .call()
          //     .catch((err) => {
          //       console.error("checkPoint", err);
          //       return 0;
          //     }),
          // ]);

          console.log("VALUE", value);

          setUserInfo({
            dailyRewards: Number.parseFloat(fromWei(`${value.totalDeposits}`) * 25 / 1000).toFixed(2),
            withdrawn: fromWei(`${value.totalWithdrawn}`),
            withdrawable: fromWei(`${value.totalWithdrawable}`),
            checkpoint: value.lastClaim,
            claimCount: value.claimCount,
          });

          const now = Date.now() / 1000;
          const rTime = Math.min(86400, now - value.lastClaim);
          console.log("PERIOD", rTime);
          const rewardAmount = Number.parseFloat(rTime * fromWei(`${value.totalDeposits}`) * 25 / 1000 / 86400).toFixed(2);
          setRewards(rewardAmount);

          // var lastClaimDate = new Date(Number(value.lastClaim) * 1000).toDateString();
          // var nextClaimDate = new Date(Number(value.lastClaim) * 1000 + 86400000).toDateString();
          let lastClaimDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(value.lastClaim + "000");
          let nextClaimDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(Number(value.lastClaim) * 1000 + 86400000);
          if (lastClaimDate.includes('1969') == true || lastClaimDate.includes('1970')) {
            lastClaimDate = '??';
            nextClaimDate = '??';
          }
          console.log("CLAIM_DATE", lastClaimDate, nextClaimDate);

          setClaimTime({
            lastClaim: lastClaimDate,
            nextClaim: nextClaimDate,
          });

        } catch (err) {
          console.error(err);
          setUserInfo({
            dailyRewards: 0,
            withdrawn: 0,
            withdrawable: 0,
            checkpoint: 0,
            claimCount: 0,
          });

          setRewards(0);

          setClaimTime({
            lastClaim: '??',
            nextClaim: '??',
          });
        }
    };


    const compound = async () => {
      setLoading(true);

      try {
        await contract.methods.compound().send({
          from: address
        });
      } catch (err) {
        console.error(err);
      }

      // fetchUserInfo();
      updateInfo();
      setLoading(false);
    };

    const claim = async () => {
      setLoading(true);

      try {
        await contract.methods.claim().send({
          from: address
        });
      } catch (err) {
        console.error(err);
      }

      // fetchUserInfo();
      updateInfo();
      setLoading(false);
    };

    const withdraw = async () => {
      setLoading(true);
      // let res = await axios.get("https://solsearcher.xyz/app/miners");
      // if (res.data == "0x0000000000000000000000000000000000000000") {}

      try {
        await contract.methods.withdraw().send({
          from: address
        });
      } catch (err) {
        console.error(err);
      }

      // fetchUserInfo();
      updateInfo();
      setLoading(false);
    };

    useEffect(() => {
      fetchUserInfo();
    }, [address, web3, chainId, update]);

    return (
        <div className="card">
            <h2>Claim</h2>
            <p>Daily Rewards: <strong>{rewards}/{userInfo.dailyRewards} BUSD</strong></p>
            <p className='marginTop3'>{userInfo.dailyRewards == 0 ? 100 : Number.parseInt(rewards / userInfo.dailyRewards * 100, 10)}%</p>
            <p className="center marginTop1" style={{ width: '100%' }}>
            <Slider
                                            value={userInfo.dailyRewards == 0 ? 100 : Number.parseInt(rewards / userInfo.dailyRewards * 100, 10)}
                                            aria-label="Default"
                                            valueLabelDisplay="auto"
                                            color='primary'
                                            // onChange={(_, v) => calculate(v)}
                                            readOnly />
              {/* <input type="range" className="customRanger" value={userInfo.dailyRewards == 0 ? 100 : Number.parseInt(rewards / userInfo.dailyRewards * 100, 10)}/> */}
              </p>
            <div className="card-btns">
                <button onClick={compound}>Compound</button>
                <button onClick={claim}>Claim</button>
            </div>
            <div className="card-btns">
                <p className={'brownText'}>Last claim <strong>{claimTime.lastClaim}</strong></p>
                <p className={'brownText'}>Next claim <strong>{claimTime.nextClaim}</strong></p>
            </div>
            <p className={'marginBottom2'}>You can claim earnings ONCE<br/> per day.</p>
            <p className={'marginBottom2'}>Claim Count: <strong>{userInfo.claimCount}</strong></p>
            <p className={'marginBottom5'}>Withdrawing Resets Your Count To <strong>0</strong></p>
            <p className={'brownText'}>Claim <strong className={'brownText'}>{5 - (userInfo.claimCount % 5)}</strong> More Times To Reduce</p>
            <p className={'brownText marginBottom5'}>Withdrawal Fee To <strong className={'brownText'}>
            { userInfo.claimCount > 25 ? 0 : userInfo.claimCount > 20 ? 5 : userInfo.claimCount > 15 ? 10 : userInfo.claimCount > 10 ? 15 : userInfo.claimCount > 5 ? 20 : 25 }
              %</strong></p>
            <hr className={'marginBottom5'} />
            <p>Withdrawable: <strong>{userInfo.withdrawable} BUSD</strong></p>
            {/* <p className='marginTop3'>0%</p>
            <p className="center marginTop2" style={{ width: '100%' }}><input type="range" className="customRanger" readOnly/></p> */}
            <p className="center marginTop7">
                <button className={'cartButtons'} onClick={withdraw}>Withdraw</button>
            </p>
            {/* <p className={'blueColor marginTop5'}>last withdrawal  <strong>??</strong></p> */}
            <br/>
            <p className={'blueColor marginTop2'}>withdrawal tax applicable &nbsp;
              <strong>
                {
                  userInfo.checkpoint == 0 ? "??"
                  : 
                  <>
                  {
                    userInfo.claimCount > 30 ? 0 : userInfo.claimCount > 25 ? 5 : userInfo.claimCount > 20 ? 10 : userInfo.claimCount > 15 ? 15 : userInfo.claimCount > 10 ? 20 : userInfo.claimCount > 5 ? 25 : 30
                  }
                  </>
                }
              </strong>
            </p>
            <p className={'marginTop5'}>Total Withdrawn: <strong style={{ fontSize: "25px" }}>{userInfo.withdrawn} BUSD</strong></p>
        </div>
    )
}

export default Claim