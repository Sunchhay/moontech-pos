import Layout from '../../components/admin/Layout'
import CardHelp from '../../components/card/CardHelp'
import { MdEmail, MdLocationOn } from 'react-icons/md'
import { FaFacebook, FaInstagramSquare, FaPhoneAlt } from 'react-icons/fa'
import { SiTelegram } from "react-icons/si";
import { AppImages } from '../../utils/lib/images';

const Help = () => {
    return (
        <Layout title='Help'>
            <div className='bg-white rounded-lg pt-5 pb-7 px-10 mt-3 mb-3 shadow-sm'>
                <div className='flex justify-center'>
                    <img src={AppImages.LogoIcon} alt='' className='w-36 h-36' />
                </div>
                <div className='font-bold text-3xl text-center my-4 text-gray-700'>How can we help you?</div>
                <div className='text-center px-14 text-gray-600 mb-8'>MoonTech POS is the most widely used platform for supporting your business. We support more than thousand customers in Cambodia. If you are looking for more information, or have any question about your account, contact us below.</div>
                <div className='flex gap-5 mb-5'>
                    <CardHelp
                        icon={<MdLocationOn size={46} className='text-red-600' />}
                        title='Our Main Office'
                        description='#Battambang'
                    />
                    <CardHelp
                        icon={<FaPhoneAlt size={36} className='text-green-500' />}
                        title='Phone'
                        description='(+855) 87 286 868'
                    />
                    <CardHelp
                        icon={<MdEmail size={40} className='text-blue-900' />}
                        title='Email'
                        description='sunchhay768@gmail.com'
                    />
                </div>
                <div className='flex gap-5 mb-3'>
                    <CardHelp
                        icon={<SiTelegram size={38} className='text-cyan-500' />}
                        title='Telegram'
                        description='Reaksmey Sunchhay'
                    />
                    <CardHelp
                        icon={<FaFacebook size={40} className='text-sky-600' />}
                        title='Facebook'
                        description='Reaskmey Sunchhay'
                    />
                    <CardHelp
                        icon={<FaInstagramSquare size={40} className='text-pink-600' />}
                        title='Instagram'
                        description='@sunchhxy_'
                    />
                </div>
            </div>
        </Layout>
    )
}

export default Help