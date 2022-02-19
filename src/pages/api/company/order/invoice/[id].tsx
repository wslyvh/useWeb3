import type { NextApiRequest, NextApiResponse } from 'next'
import { AirtableService } from 'services/airtable'
import { jsPDF } from 'jspdf'
import { getPrice, RECEIVER_ADDRESS, RECEIVER_ENS } from 'utils/jobs'

const defaultFont = 'courier'
const offsetLeft = 20
const offsetRight = 190

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const service = new AirtableService()
    const order = await service.GetOrder(req.query.id as string)
    if (!order) {
      return res.status(500).json({ status: 200, message: 'Unable to get order' })
    }

    const doc = new jsPDF()
    doc.setProperties({
      title: `Invoice ${order.invoiceNr}`,
      subject: `Job Package @ useWeb3.xyz - ${order.type}`,
      author: 'useWeb3',
      creator: 'useWeb3',
    })

    // From
    doc.setFontSize(20)
    doc.setFont(defaultFont, 'bold')
    doc.text('INVOICE', offsetRight, 20, { align: 'right' })

    doc.setFontSize(12)
    doc.setFont(defaultFont, 'bold')
    doc.text('useWeb3', offsetRight, 30, { align: 'right' })

    doc.setFont(defaultFont, 'normal')
    doc.text(String(process.env.INVOICE_DETAILS), offsetRight, 35, { align: 'right' })

    // TO
    doc.setFont(defaultFont, 'bold')
    doc.text('BILL TO', offsetLeft, 75, { align: 'left' })

    doc.setFont(defaultFont, 'normal')
    doc.text(
      `${order.companyName}
${order.name}
${order.email}

${order.address}`,
      offsetLeft + 25,
      75,
      { align: 'left' }
    )

    // Invoice Details
    doc.setFont(defaultFont, 'bold')
    doc.text('Invoice Number', offsetRight, 75, { align: 'right' })
    doc.setFont(defaultFont, 'normal')
    doc.text(String(order.invoiceNr), offsetRight, 80, { align: 'right' })

    doc.setFont(defaultFont, 'bold')
    doc.text('Invoice Date', offsetRight, 90, { align: 'right' })
    doc.setFont(defaultFont, 'normal')
    doc.text((order.created ? new Date(order.created) : new Date()).toDateString(), offsetRight, 95, { align: 'right' })

    doc.setFont(defaultFont, 'bold')
    doc.text('Amount', offsetRight, 105, { align: 'right' })
    doc.setFont(defaultFont, 'normal')
    doc.text(`$${getPrice(order.type)} USD`, offsetRight, 110, { align: 'right' })

    // Line
    doc.setDrawColor(200)
    doc.line(offsetLeft, 130, offsetRight, 130)

    // Order
    doc.setFont(defaultFont, 'normal')
    doc.text(`Job Package @ useWeb3.xyz - ${order.type}`, offsetLeft, 140, { align: 'left' })
    doc.text(`$${getPrice(order.type)} USD`, offsetRight, 140, { align: 'right' })

    // Line
    doc.setDrawColor(200)
    doc.line(offsetLeft, 147.5, offsetRight, 147.5)

    doc.setFont(defaultFont, 'bold')
    doc.text(`TOTAL`, 170, 160, { align: 'right' })
    doc.setFont(defaultFont, 'normal')
    doc.text(`$${getPrice(order.type)} USD`, offsetRight, 160, { align: 'right' })

    // Payment
    doc.setFont('times', 'normal')
    doc.text(`Accepted Payments: ETH/DAI/USDC on Ethereum Mainnet/Arbitrum/Optimism`, offsetLeft, 200, {
      align: 'left',
    })
    doc.text(`Address: ${RECEIVER_ADDRESS} (${RECEIVER_ENS})`, offsetLeft, 207.5, { align: 'left' })

    // Transaction
    doc.setFontSize(10)
    doc.setTextColor(150)
    doc.setFont('times', 'bold')
    doc.text(order.tx, offsetLeft, 215, { align: 'left' })

    // Thank you
    doc.setFontSize(20)
    doc.setTextColor(0)
    doc.setFont(defaultFont, 'normal')
    doc.text(`Thank you for your order!`, 105, 240, { align: 'center' })
    doc.setFontSize(12)
    doc.text(`- Wesley`, 105, 250, { align: 'center' })

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-disposition', `inline; filename=\"Invoice_${order.invoiceNr}.pdf\"`)
    return res.send(doc.output())
  }

  return res.status(400).send({ code: 400, message: 'Invalid method.' })
}
