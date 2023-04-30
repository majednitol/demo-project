import { useEffect, useState } from "react";
import { ethers } from "ethers"

import React from 'react'

const index = () => {

  const [currentAccount, setCurrentAccount] = useState('')
  const [connect, setConnect] = useState(false)
  const [balance, setBalance] = useState('')

  const failMassege = 'please connect metamask and install '
  const successMessege = 'your account successfully connected'
  const infura_id = '6ea493d8d456483989c84b452369c238'
  const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${infura_id}`)

  const checkWalletConnected = async () => {

    if (!window.ethereum) return setConnect(failMassege)
    const account = await window.ethereum.request({ method: "eth_requestAccounts" })
    console.log(account)
    if (account.length) {
      
      setCurrentAccount(account[0])
      // window.location.reload()
    } else {
      console.log("no account found")
    }

    const balance = await provider.getBalance(`0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5`)
    const balEth = ethers.utils.formatEther(balance)
    setBalance(balEth)
  }
  useEffect(() => {
    checkWalletConnected()

  }, [])


  return (
    <>
      <h1>{currentAccount ? <div><h1>{successMessege}</h1>
        <h2>{currentAccount}</h2>
      </div> : connect}</h1>
      <h1>{balance}</h1>
      <h1>{ }</h1>
    </>
  )
}

export default index