import { useEtherPrice } from 'hooks/useEtherPrice'
import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import styles from './payment.module.scss'
import Web3Modal from "web3modal"
import WalletConnectProvider from '@walletconnect/web3-provider'
import { Web3Provider } from "@ethersproject/providers"
import { parseUnits } from '@ethersproject/units'

interface Props {
    price: number
    className?: string
}

const acceptedNetworks = [1, 10, 42161]
const receivingAddress = '0xA512C3cF9A63715CEd87DE5058c684cBFF9f4321'
const receivingName = 'useweb3.eth'

// const providerOptions = {
//     walletconnect: {
//         package: WalletConnectProvider,
//         options: {
//             infuraId: "INFURA_ID"
//         }
//     }
// }

export function Payment(props: Props) {
    const isBrowser = typeof window !== 'undefined'
    if (!isBrowser) return <></>

    // const web3Modal = new Web3Modal({
    //     providerOptions
    // })

    const etherPrice = useEtherPrice()
    const [priceInEther, setPriceInEther] = useState('')
    const [message, setMessage] = useState('')

    let className = `${styles.container} fixed wrapper block`
    if (props.className) className += ` ${props.className}`

    useEffect(() => {
        if (etherPrice > 0) {
            setPriceInEther((props.price / etherPrice).toFixed(8))
        }
    }, [props.price, etherPrice])

    async function connectAndPay() {
        try {
            const instance = await web3Modal.connect()
            const provider = new Web3Provider(instance)
            const signer = provider.getSigner()
            const address = await signer.getAddress()
            const network = await provider.getNetwork()
            if (!acceptedNetworks.some(i => i === network.chainId)) {
                setMessage('Please select Mainnet/Optimism/Arbitrum')
                return
            }
            else {
                setMessage('')
            }

            // Send in Eth
            const params = [{
                from: address,
                to: receivingAddress,
                value: parseUnits(priceInEther, 'ether').toHexString()
            }]
            const tx = await provider.send('eth_sendTransaction', params)

            // Send in DAI/USDC
        }
        catch (e) {
            if (e === 'Modal closed by user') setMessage('Connection cancelled..')
            if (e.code === 4001) setMessage('Transaction cancelled..')
        }
    }

    return (
        <div className={className}>
            <div className={styles.card}>
                <h3>Payment</h3>
                <p className='muted'>Send a payment using the QR code or address below</p>

                <div className={styles.qr} >
                    <QRCode value={receivingAddress} size={128} />
                </div>

                <div className={styles.row}>
                    <div className={styles.text}>
                        <span className='muted'>Address</span><br />
                        {receivingAddress}
                    </div>
                    <i className={`${styles.icon} bi bi-clipboard`} role='button'
                        onClick={() => navigator.clipboard.writeText(receivingAddress)} />
                </div>
                <div className={styles.row}>
                    <div className={styles.text}>
                        <span className='muted'>ENS</span><br />
                        {receivingName}
                    </div>
                    <i className={`${styles.icon} bi bi-clipboard`} role='button'
                        onClick={() => navigator.clipboard.writeText(receivingName)} />
                </div>
                <div className={styles.row}>
                    <div className={styles.text}>
                        <span className='muted'>Amount</span><br />
                        ${props.price} USD / {priceInEther} ETH
                    </div>
                    <i className={`${styles.icon} bi bi-clipboard`} role='button'
                        onClick={() => navigator.clipboard.writeText(priceInEther)} />
                </div>
                <div className={styles.row}>
                    <strong>* Only ETH/DAI/UDSC on Mainnet/Arbitrum/Optimism</strong>
                </div>

                {/* <div className={styles.row}>
                    <button type="button" className="accent block" onClick={connectAndPay}>Pay with wallet</button>
                </div> 
                {message && <div className={styles.row}>
                    {message}
                    </div>} */}
            </div>
        </div>
    )
}

