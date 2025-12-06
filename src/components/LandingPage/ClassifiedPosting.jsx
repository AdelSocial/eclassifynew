// 'use client'
// import Image from 'next/image'
// import img1 from '../../../public/assets/classified_Image1.svg'
// import img2 from '../../../public/assets/classified_Image2.svg'
// import img3 from '../../../public/assets/classified_Image3.svg'
// import img4 from '../../../public/assets/classified_Image4.svg'
// import { isLogin, placeholderImage, t } from '@/utils'
// import { FiPlusCircle } from 'react-icons/fi'
// import { getLimitsApi } from '@/utils/api'
// import toast from 'react-hot-toast'
//  import { verifyApi } from '@/api/verifyApi';
//  import { getLimitsApi } from '@/api/getLimitsApi';
// import { verifyApi } from '@/api/verifyApi';
// import { toast } from 'react-toastify';
// import { useRouter } from 'next/router';

// const ClassifiedPosting = () => {
//     const getLimitsData = async () => {
//         try {
//             // const res = await getLimitsApi.getLimits({ package_type: 'item_listing' })
//             // if (res?.data?.error === false) {
//             //     router.push('/ad-listing')
//             // } else {
//             //     toast.error(res?.data?.message)
//             //     router.push('/subscription')
//             // }
//                    //   Check User Verification
//                 const res = await verifyApi.checkStatus(); // your API endpoint

//                 if (res?.data?.status !== 'approved') {
//                     router.push('https://www.libwana.com/user-verification');
//                     return; // Stop here
//                 }

//                 //  If approved → continue existing logic
//                 const limitRes = await getLimitsApi.getLimits({ package_type: 'item_listing' });

//                 if (limitRes?.data?.error === false) {
//                     router.push('/ad-listing');
//                 } else {
//                     toast.error(limitRes?.data?.message);
//                     router.push('/subscription');
//                 }
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     // verification
    
//     // verification

//     const handleCheckLogin = (e) => {
//         e.preventDefault()
//         if (isLogin()) {
//             getLimitsData()
//         } else {
//             toast.error(t('loginFirst'))
//         }
//     }
//     return (
//         <section id='classified_sec'>
//             <div className="container classified_wrapper">
//                 <div className="container">
//                     <div className="classified_posting">
//                         <h1 className="classified_title">{t('craftEpic')}<br />{t('classifiedsPosting')}</h1>

//                         <button className="classified_btn" onClick={handleCheckLogin}>

//                             {t('createAdd')}
//                             &nbsp;
//                             <FiPlusCircle size={24} color='white' />
//                         </button>
//                         <Image src={img1} width={230} height={275} alt='Working' className='classified_img1' onErrorCapture={placeholderImage} />
//                         <Image src={img2} width={230} height={275} alt='Working' className='classified_img2' onErrorCapture={placeholderImage} />
//                         <Image src={img3} width={130} height={155} alt='Working' className='classified_img3' onErrorCapture={placeholderImage} />
//                         <Image src={img4} width={130} height={155} alt='Working' className='classified_img4' onErrorCapture={placeholderImage} />
//                     </div>
//                 </div>

//             </div>
//         </section>

//     )
// }

// export default ClassifiedPosting

'use client'

import Image from 'next/image'
import img1 from '../../../public/assets/classified_Image1.svg'
import img2 from '../../../public/assets/classified_Image2.svg'
import img3 from '../../../public/assets/classified_Image3.svg'
import img4 from '../../../public/assets/classified_Image4.svg'

import { isLogin, placeholderImage, t } from '@/utils'
import { FiPlusCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'

import { verifyApi } from '@/api/verifyApi'
import { getLimitsApi } from '@/api/getLimitsApi'
import { useRouter } from 'next/navigation'

const ClassifiedPosting = () => {
    const router = useRouter()

    const getLimitsData = async () => {
        try {
            // === CHECK USER VERIFICATION STATUS ===
            const verifyRes = await verifyApi.checkStatus() // GET /user-verification/{id}

            const status = verifyRes?.data?.status

            if (status !== 'approved') {
                // if rejected or pending → redirect to verification page
                router.push('https://www.libwana.com/user-verification')
                return
            }

            // === APPROVED USER → CHECK LISTING LIMIT ===
            const limitRes = await getLimitsApi.getLimits({ package_type: 'item_listing' })

            if (limitRes?.data?.error === false) {
                router.push('/ad-listing')
            } else {
                toast.error(limitRes?.data?.message)
                router.push('/subscription')
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
    const handleCheckLogin = (e) => {
        e.preventDefault()

        if (isLogin()) {
            getLimitsData()
        } else {
            toast.error(t('loginFirst'))
        }
    }
    return (
        <section id='classified_sec'>
            <div className="container classified_wrapper">
                <div className="container">
                    <div className="classified_posting">
                        <h1 className="classified_title">
                            {t('craftEpic')}<br />{t('classifiedsPosting')}
                        </h1>

                        <button className="classified_btn" onClick={handleCheckLogin}>
                            {t('createAdd')}
                            &nbsp;
                            <FiPlusCircle size={24} color='white' />
                        </button>

                        <Image src={img1} width={230} height={275} alt='Working' className='classified_img1' onErrorCapture={placeholderImage} />
                        <Image src={img2} width={230} height={275} alt='Working' className='classified_img2' onErrorCapture={placeholderImage} />
                        <Image src={img3} width={130} height={155} alt='Working' className='classified_img3' onErrorCapture={placeholderImage} />
                        <Image src={img4} width={130} height={155} alt='Working' className='classified_img4' onErrorCapture={placeholderImage} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ClassifiedPosting
