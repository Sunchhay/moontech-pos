'use client'
import React from 'react'
import Header from '../../components/pos/Header'
import CardOrderItem from '../../components/card/CardOrderItem'
import { AppButton } from '../../components/custom/AppButton'

const Menu = () => {

    return (
        <div>
            <Header />
            <div className='flex relative'>
                <div className='w-full h-screen max-w-full overflow-x-hidden'>

                </div>
                <div className='fixed w-[400px] h-full p-5 pt-[75px] right-0 shadow-md z-10'>
                    <div className='font-semibold text-lg mb-2 mt-1'>Order Details</div>
                    <div className='text-sm mb-1.5'>{`${'Table: A05'}`}</div>
                    <div className='text-sm text-gray-400 mb-1.5'>{`${'Date: 15/01/24, 2:30PM'}`}</div>
                    <div className='text-sm text-gray-400 mb-3.5'>{`${'No: #0000001'}`}</div>
                    <div className='h-[1px] w-full bg-gray-200'></div>
                    <div className='fixed top-[205px] right-5 bottom-[270px] order-detail-left overflow-y-auto mt-1 pr-5 mr-[-5px]'>
                        {
                            [...Array(6)].map((value, index) => (
                                <CardOrderItem key={index} />
                            ))
                        }
                    </div>
                    <div className='absolute right-4 bottom-5 left-4'>
                        <div className='h-[1px] w-full bg-gray-200 mb-4'></div>
                        <div className='flex justify-between items-center mb-3'>
                            <div className='text-sm text-gray-400'>Subtotal</div>
                            <div className='text-sm'>$102.32</div>
                        </div>
                        <div className='flex justify-between items-center mb-3'>
                            <div className='text-sm text-gray-400'>VAT</div>
                            <div className='text-sm'>$10.23</div>
                        </div>
                        <div className='flex justify-between items-center mb-3'>
                            <div className='text-sm text-gray-400'>Discount</div>
                            <div className='text-sm'>$0.00</div>
                        </div>
                        <div className='h-[1px] w-full bg-gray-200 mb-4'></div>
                        <div className='flex justify-between items-center mb-3'>
                            <div className='text-base font-semibold'>Total</div>
                            <div className='text-base font-semibold'>$112.54</div>
                        </div>
                        <AppButton title='Order' className='h-[40px] mt-7 mb-0' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu