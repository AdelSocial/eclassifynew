"use client";
import { placeholderImage, t } from "@/utils";
import Image from "next/image";
import { MdOutlineShare, MdVerifiedUser } from "react-icons/md";
import { IoMdStar } from "react-icons/io";
import { RiMailSendLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
import { Dropdown, Menu } from "antd";
import { usePathname } from "next/navigation";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import { CiLink } from "react-icons/ci";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter, FaInstagram } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { settingsData } from "@/redux/reuducer/settingSlice";

// Swiper Slider
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const SellerCard = ({ seller, ratings }) => {
  const path = usePathname();
  const systemSettings = useSelector(settingsData);
  const CompanyName = systemSettings?.data?.company_name;
  const currentUrl = `${process.env.NEXT_PUBLIC_WEB_URL}${path}`;
  const placeholder_image = systemSettings?.data?.placeholder_image;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  const extractYear = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  const memberSinceYear = seller?.created_at
    ? extractYear(seller?.created_at)
    : "";

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.success(t("copyToClipboard"));
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  // Get day name from index (0 = Sunday, 1 = Monday, etc.)
  const getDayName = (dayIndex) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[dayIndex];
  };

  // Check if store is open now
  const checkOpenNow = () => {
    if (!seller?.store_hours || typeof seller.store_hours !== "object")
      return null;

    const today = new Date().getDay(); // 0 = Sunday
    const dayName = getDayName(today);
    const todayHours = seller.store_hours[dayName];

    if (!todayHours || todayHours.toLowerCase() === "closed") {
      return <span className="closed">{t("closedToday")}</span>;
    }

    // Parse time string like "10am - 6pm"
    try {
      const [openTimeStr, closeTimeStr] = todayHours
        .split(" - ")
        .map((s) => s.trim());

      // Convert "10am" to 24-hour format
      const parseTime = (timeStr) => {
        const match = timeStr.match(/(\d{1,2})(am|pm)/i);
        if (!match) return null;
        let hours = parseInt(match[1]);
        const period = match[2].toLowerCase();
        if (period === "pm" && hours !== 12) hours += 12;
        if (period === "am" && hours === 12) hours = 0;
        return hours;
      };

      const openHour = parseTime(openTimeStr);
      const closeHour = parseTime(closeTimeStr);

      if (openHour === null || closeHour === null) {
        return <span className="open">{todayHours}</span>;
      }

      const now = new Date();
      const currentHour = now.getHours();

      if (currentHour >= openHour && currentHour < closeHour) {
        return <span className="open">{t("openNow")}</span>;
      } else {
        return <span className="closed">{t("closedNow")}</span>;
      }
    } catch (error) {
      return <span className="open">{todayHours}</span>;
    }
  };

  // ⭐ Share Menu
  const menuItem = (
    <Menu>
      <Menu.Item key="1">
        <FacebookShareButton
          className="w-100"
          url={currentUrl}
          title={seller?.name}
          hashtag={CompanyName}
        >
          <div className="shareLabelCont">
            <FacebookIcon size={30} round />
            <span>{t("facebook")}</span>
          </div>
        </FacebookShareButton>
      </Menu.Item>

      <Menu.Item key="2">
        <TwitterShareButton
          className="w-100"
          url={currentUrl}
          title={seller?.name}
        >
          <div className="shareLabelCont">
            <XIcon size={30} round />
            <span>X</span>
          </div>
        </TwitterShareButton>
      </Menu.Item>

      <Menu.Item key="3">
        <WhatsappShareButton
          className="w-100"
          url={currentUrl}
          title={seller?.name}
        >
          <div className="shareLabelCont">
            <WhatsappIcon size={30} round />
            <span>{t("whatsapp")}</span>
          </div>
        </WhatsappShareButton>
      </Menu.Item>

      <Menu.Item key="4">
        <div className="shareLabelCont" onClick={handleCopyUrl}>
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
        <h6 className="seller_info">{t("seller_info")}</h6>

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
              <p className="verified_text">{t("verified")}</p>
            </div>
          )}

          {memberSinceYear && (
            <p className="member_since">
              {t("memberSince")}: {memberSinceYear}
            </p>
          )}
        </div>
      )}

      {/* SELLER IMAGE SLIDER */}
      {seller?.slider_images && seller.slider_images.length > 0 && (
        <div className="seller_slider">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
          >
            {seller.slider_images.map((img, i) => {
              const imageUrl = img.startsWith("http")
                ? img
                : `${apiBaseUrl}/${img}`;
              return (
                <SwiperSlide key={i}>
                  <Image
                    src={imageUrl}
                    width={300}
                    height={200}
                    alt="seller image"
                    className="seller_slider_img"
                    onErrorCapture={placeholderImage}
                  />
                </SwiperSlide>
              );
            })}
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
                {Math.round(seller?.average_rating)} | {ratings?.data?.length}{" "}
                {t("ratings")}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* STORE HOURS */}
      {seller?.store_hours && typeof seller.store_hours === "object" && (
        <div className="seller_store_hours_card">
          <div className="seller_store_hours_header">
            <h6 className="seller_store_hours_title">{t("storeHours")}</h6>
            <div className="seller_store_status">{checkOpenNow()}</div>
          </div>

          <div className="seller_store_hours_list">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => {
              const hours = seller.store_hours[day];
              if (!hours) return null;
              const isToday = getDayName(new Date().getDay()) === day;
              const isClosed = hours.toLowerCase() === "closed";
              return (
                <div
                  key={day}
                  className={`seller_store_hour_item ${isToday ? "today" : ""}`}
                >
                  <span className="seller_store_day">{day}</span>
                  <span
                    className={`seller_store_time ${isClosed ? "closed" : ""}`}
                  >
                    {hours}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SOCIAL MEDIA */}
      {(seller?.facebook ||
        seller?.twitter ||
        seller?.instagram ||
        seller?.youtube) && (
        <div className="seller_social_links_card">
          <h6 className="seller_social_title">
            {t("followUs") || "Follow Us"}
          </h6>
          <div className="seller_social_icons">
            {seller?.facebook && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={seller.facebook}
                className="seller_social_icon facebook"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
            )}
            {seller?.twitter && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={seller.twitter}
                className="seller_social_icon twitter"
                aria-label="Twitter"
              >
                <FaSquareXTwitter size={20} />
              </a>
            )}
            {seller?.instagram && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={seller.instagram}
                className="seller_social_icon instagram"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            )}
            {seller?.youtube && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={seller.youtube}
                className="seller_social_icon youtube"
                aria-label="YouTube"
              >
                <FaYoutube size={20} />
              </a>
            )}
          </div>
        </div>
      )}

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
