import React from 'react'
import { Main as MainLayout } from 'components/layouts/main'
import { Card } from 'components/card'
import { Featured } from 'components/featured'

export default function Index() {
  return (
    <MainLayout>

      <article>
        <p>
          We provide you with the latest resources to learn anything related to web3, Ethereum and blockchain development.
        </p>
        <br/>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempus, elit et tristique semper, justo magna feugiat lacus, sed tempus nisl neque et sapien. Morbi ullamcorper augue nisl, in auctor ipsum sagittis ut. Integer ullamcorper <a href="#">tellus et posuere sollicitudin</a>. Mauris nec nulla libero. Morbi dignissim nec enim non vehicula. Aliquam erat volutpat.</p>
        <br/>
      </article>

      <Featured title='Books'>
        <Card small
          title='Mastering Ethereum'
          description='Andreas M. Antonopoulos, Gavin Wood' 
          tag='Book'
          url='https://github.com/ethereumbook/ethereumbook' />
        <Card small
          title='The Infinite Machine'
          description='Camila Russo'
          tag='Book'
          url='https://www.goodreads.com/book/show/50175330-the-infinite-machine' />
        <Card small
          title='Out of the Ether' 
          description='Matthew Leising' 
          tag='Book'
          url='https://www.goodreads.com/book/show/55360267-out-of-the-ether' />
      </Featured>

      <Featured title='Courses'>
        <Card title='a16z Crypto Startup School' description='A great overview with hours of videos, lectures, presentations, real-world insights and fireside chats from some of the best minds in the space. Highly recommended' url='https://a16z.com/crypto-startup-school/' />
        <Card title='ConsenSys Academy' description='World class programs from one of the leading companies in the space. They offer free, on-demand courses, webinars and (paid) certificate programs &amp; bootcamps.' />
        <Card title='Blockchain at Berkeley' description='B@B is dedicated to become the blockchain hub of the East Bay. They debuted the world’s first undergraduate university-accredited blockchain course, Blockchain Fundamentals' />
      </Featured>
    </MainLayout>
  )
}
