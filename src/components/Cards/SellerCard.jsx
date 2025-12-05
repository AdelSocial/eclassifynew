// 'use client'
// import { placeholderImage, t } from "@/utils"
// import Image from "next/image"
// import { MdOutlineShare, MdVerifiedUser } from "react-icons/md"
// import { IoMdStar } from "react-icons/io"
// import { RiMailSendLine } from "react-icons/ri"
// import { FiPhoneCall } from "react-icons/fi"
// import { Dropdown, Menu } from "antd"
// import { usePathname } from "next/navigation"
// import { FacebookIcon, FacebookShareButton, TwitterShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from "react-share"
// import { CiLink } from "react-icons/ci"
// import toast from "react-hot-toast"
// import { useSelector } from "react-redux"
// import { settingsData } from "@/redux/reuducer/settingSlice"
// import BusinessQRCode from "@/components/QRCode/BusinessQRCode"




// const SellerCard = ({ seller, ratings }) => {

//     const path = usePathname()
//     const systemSettings = useSelector(settingsData)
//     const CompanyName = systemSettings?.data?.company_name
//     const currentUrl = `${process.env.NEXT_PUBLIC_WEB_URL}${path}`;
//     const placeholder_image = systemSettings?.data?.placeholder_image
//     const extractYear = (dateString) => {
//         const date = new Date(dateString);
//         return date.getFullYear();
//     };

//     const memberSinceYear = seller?.created_at ? extractYear(seller?.created_at) : '';

//     const handleCopyUrl = async () => {

//         try {
//             await navigator.clipboard.writeText(currentUrl);
//             toast.success(t("copyToClipboard"));
//         } catch (error) {
//             console.error("Error copying to clipboard:", error);
//         }
//     };


//     const menuItem = <Menu>
//         <Menu.Item key="1">
//             <FacebookShareButton className="w-100" url={currentUrl} title={seller?.name} hashtag={CompanyName}>
//                 <div className='shareLabelCont'>
//                     <FacebookIcon size={30} round />
//                     <span>{t('facebook')}</span>
//                 </div>
//             </FacebookShareButton>
//         </Menu.Item>
//         <Menu.Item key="2">
//             <TwitterShareButton className="w-100" url={currentUrl} title={seller?.name}>
//                 <div className='shareLabelCont'>
//                     <XIcon size={30} round />
//                     <span>X</span>
//                 </div>
//             </TwitterShareButton>
//         </Menu.Item>
//         <Menu.Item key="3">
//             <WhatsappShareButton className="w-100" url={currentUrl} title={seller?.name} hashtag={CompanyName}>
//                 <div className='shareLabelCont'>
//                     <WhatsappIcon size={30} round />
//                     <span>{t('whatsapp')}</span>
//                 </div>
//             </WhatsappShareButton>
//         </Menu.Item>

//         <Menu.Item key="4">
//             <div className='shareLabelCont' title={seller?.name} onClick={handleCopyUrl}>
//                 <CiLink size={30} />
//                 <span>{t("copyLink")}</span>
//             </div>
//         </Menu.Item>
//     </Menu>


//     return (
//         <>
//             <div className="seller_card">
//                 <div className="seller_info_header">
//                     <h6 className="seller_info">{t('seller_info')}</h6>


//                     <Dropdown overlay={menuItem} placement="bottomRight" arrow>

//                         <div className="shareIcon_cont">
//                             <MdOutlineShare size={24} />
//                         </div>

//                     </Dropdown>


//                 </div>

//                 {
//                     (seller?.is_verified === 1 || memberSinceYear) &&
//                     <div className="seller_verified_cont">

//                         {
//                             seller?.is_verified === 1 &&
//                             <div className="verfied_cont">
//                                 <MdVerifiedUser size={16} />
//                                 <p className="verified_text">{t('verified')}</p>
//                             </div>
//                         }

//                         {
//                             memberSinceYear &&
//                             <p className="member_since">
//                                 {t('memberSince')}: {memberSinceYear}
//                             </p>
//                         }

//                     </div>
//                 }

//                 <div className="seller_name_img_cont">
//                     <Image src={seller?.profile || placeholder_image} width={120} height={120} className="seller_img" alt="seller image" onErrorCapture={placeholderImage} />

//                     <div className="seller_name_rating_cont">
//                         <p className="seller_name">{seller?.name}</p>
//                         {
//                             seller?.average_rating &&
//                             <div className="seller_Rating_cont">
//                                 <IoMdStar size={16} />
//                                 <p className="seller_rating">{Math.round(seller?.average_rating)} | {ratings?.data?.length} {t('ratings')}</p>
//                             </div>
//                         }
//                     </div>
//                 </div>

//                 {
//                     seller?.show_personal_details === 1 &&
//                     <div className="seller_details">
//                         <div className="seller_email">
//                             <div className="email_icon_cont">
//                                 <RiMailSendLine size={16} />
//                             </div>
//                             <a href={`mailto:${seller?.email}`}>
//                                 <span>{seller?.email}</span>
//                             </a>
//                         </div>
//                         <div className="seller_phone">
//                             <div className="email_icon_cont">
//                                 <FiPhoneCall size={16} />
//                             </div>
//                             <a href={`tel:${seller?.mobile}`}>
//                                 <span className="">{seller?.mobile}</span>
//                             </a>
//                         </div>
//                     </div>
//                 }
//             </div>
//         </>
//     )
// }

// export default SellerCard

'use client'
import { placeholderImage, t } from "@/utils"
import Image from "next/image"
import { MdOutlineShare, MdVerifiedUser } from "react-icons/md"
import { IoMdStar } from "react-icons/io"
import { RiMailSendLine } from "react-icons/ri"
import { FiPhoneCall } from "react-icons/fi"
import { Dropdown, Menu } from "antd"
import { usePathname } from "next/navigation"
import {
    FacebookIcon, FacebookShareButton,
    TwitterShareButton, WhatsappIcon,
    WhatsappShareButton, XIcon
} from "react-share"
import { CiLink } from "react-icons/ci"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { settingsData } from "@/redux/reuducer/settingSlice"

// Swiper Slider
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination } from "swiper/modules"

const SellerCard = ({ seller, ratings }) => {

    const path = usePathname()
    const systemSettings = useSelector(settingsData)
    const CompanyName = systemSettings?.data?.company_name
    const currentUrl = `${process.env.NEXT_PUBLIC_WEB_URL}${path}`;
    const placeholder_image = systemSettings?.data?.placeholder_image

    const extractYear = (dateString) => {
        const date = new Date(dateString);
        return date.getFullYear();
    };

    const memberSinceYear = seller?.created_at ? extractYear(seller?.created_at) : '';

    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            toast.success(t("copyToClipboard"));
        } catch (error) {
            console.error("Error copying to clipboard:", error);
        }
    };

    // ⭐ Check Open Now / Closed
    const checkOpenNow = () => {
        if (!seller?.store_hours) return null;

        const today = new Date().getDay(); // 0 = Sunday
        const todayData = seller.store_hours[today];

        if (!todayData || todayData.is_closed) {
            return <span className="closed">{t("closedToday")}</span>;
        }

        const now = new Date();
        const [openHr, openMin] = todayData.open.split(":");
        const [closeHr, closeMin] = todayData.close.split(":");

        const openTime = new Date();
        openTime.setHours(openHr, openMin);

        const closeTime = new Date();
        closeTime.setHours(closeHr, closeMin);

        return now >= openTime && now <= closeTime
            ? <span className="open">{t("openNow")}</span>
            : <span className="closed">{t("closedNow")}</span>;
    };

    // ⭐ Share Menu
    const menuItem = (
        <Menu>
            <Menu.Item key="1">
                <FacebookShareButton className="w-100" url={currentUrl} title={seller?.name} hashtag={CompanyName}>
                    <div className='shareLabelCont'>
                        <FacebookIcon size={30} round />
                        <span>{t('facebook')}</span>
                    </div>
                </FacebookShareButton>
            </Menu.Item>

            <Menu.Item key="2">
                <TwitterShareButton className="w-100" url={currentUrl} title={seller?.name}>
                    <div className='shareLabelCont'>
                        <XIcon size={30} round />
                        <span>X</span>
                    </div>
                </TwitterShareButton>
            </Menu.Item>

            <Menu.Item key="3">
                <WhatsappShareButton className="w-100" url={currentUrl} title={seller?.name}>
                    <div className='shareLabelCont'>
                        <WhatsappIcon size={30} round />
                        <span>{t('whatsapp')}</span>
                    </div>
                </WhatsappShareButton>
            </Menu.Item>

            <Menu.Item key="4">
                <div className='shareLabelCont' onClick={handleCopyUrl}>
                    <CiLink size={30} />
                    <span>{t("copyLink")}</span>
                </div>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="seller_card">

            {/* TOP HEADER */}
            <div className="seller_info_header">
                <h6 className="seller_info">{t('seller_info')}</h6>

                <Dropdown overlay={menuItem} placement="bottomRight" arrow>
                    <div className="shareIcon_cont">
                        <MdOutlineShare size={24} />
                    </div>
                </Dropdown>

            </div>

            {/* VERIFIED & MEMBER SINCE */}
            {(seller?.is_verified === 1 || memberSinceYear) && (
                <div className="seller_verified_cont">

                    {seller?.is_verified === 1 && (
                        <div className="verfied_cont">
                            <MdVerifiedUser size={16} />
                            <p className="verified_text">{t('verified')}</p>
                        </div>
                    )}

                    {memberSinceYear && (
                        <p className="member_since">
                            {t('memberSince')}: {memberSinceYear}
                        </p>
                    )}

                </div>
            )}

            {/* SELLER IMAGE SLIDER */}
            {seller?.images?.length > 0 && (
                <div className="seller_slider">
                    <Swiper
                        modules={[Pagination]}
                        pagination={{ clickable: true }}
                        spaceBetween={10}
                        slidesPerView={1}
                    >
                        {seller.images.map((img, i) => (
                            <SwiperSlide key={i}>
                                <Image
                                    src={img}
                                    width={300}
                                    height={200}
                                    alt="seller image"
                                    className="seller_slider_img"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}

            {/* PROFILE + RATING */}
            <div className="seller_name_img_cont">
                <Image
                    src={seller?.profile || placeholder_image}
                    width={120}
                    height={120}
                    className="seller_img"
                    alt="seller image"
                    onErrorCapture={placeholderImage}
                />

                <div className="seller_name_rating_cont">
                    <p className="seller_name">{seller?.name}</p>

                    {seller?.average_rating && (
                        <div className="seller_Rating_cont">
                            <IoMdStar size={16} />
                            <p className="seller_rating">
                                {Math.round(seller?.average_rating)} | {ratings?.data?.length} {t('ratings')}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* STORE HOURS */}
            {seller?.store_hours && (
                <div className="store_hours">
                    <h6>{t("storeHours")}</h6>

                    <p>{checkOpenNow()}</p>

                    {seller.store_hours.map((item, index) => (
                        <div key={index} className="store_hour_row">
                            <span>{item.day}</span>
                            {item.is_closed ? (
                                <span>{t("closed")}</span>
                            ) : (
                                <span>{item.open} - {item.close}</span>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* SOCIAL MEDIA */}
            <div className="seller_social_links">
                {seller?.facebook && <a target="_blank" href={seller.facebook}>Facebook</a>}
                {seller?.twitter && <a target="_blank" href={seller.twitter}>Twitter</a>}
                {seller?.instagram && <a target="_blank" href={seller.instagram}>Instagram</a>}
                {seller?.youtube && <a target="_blank" href={seller.youtube}>YouTube</a>}
            </div>

            {/* CONTACT DETAILS */}
            {seller?.show_personal_details === 1 && (
                <div className="seller_details">
                    <div className="seller_email">
                        <div className="email_icon_cont">
                            <RiMailSendLine size={16} />
                        </div>
                        <a href={`mailto:${seller?.email}`}>
                            <span>{seller?.email}</span>
                        </a>
                    </div>

                    <div className="seller_phone">
                        <div className="email_icon_cont">
                            <FiPhoneCall size={16} />
                        </div>
                        <a href={`tel:${seller?.mobile}`}>
                            <span>{seller?.mobile}</span>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellerCard;
