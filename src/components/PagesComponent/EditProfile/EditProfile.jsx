"use client";
import ProfileSidebar from "@/components/Profile/ProfileSidebar";
import Image from "next/image";
import user from "../../../../public/assets/Transperant_Placeholder.png";
import { placeholderImage, t } from "@/utils";
import { useSelector } from "react-redux";
import { userSignUpData } from "@/redux/reuducer/authSlice";
import { useEffect, useState } from "react";
import { MdAddPhotoAlternate, MdVerifiedUser } from "react-icons/md";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter, FaInstagram } from "react-icons/fa6";
import { getVerificationStatusApi, updateProfileApi } from "@/utils/api";
import { Fcmtoken } from "@/redux/reuducer/settingSlice";
import toast from "react-hot-toast";
import { loadUpdateUserData } from "../../../redux/reuducer/authSlice";
import BreadcrumbComponent from "@/components/Breadcrumb/BreadcrumbComponent";
import { CurrentLanguageData } from "@/redux/reuducer/languageSlice";
import { useRouter } from "next/navigation";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Helper function to format 24-hour time to 12-hour format
const formatTime12Hour = (time24) => {
  if (!time24) return "";
  const [hours, minutes] = time24.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

// Helper function to convert 12-hour format to 24-hour format for time input
const convertTo24Hour = (time12) => {
  if (!time12) return "";
  // Handle formats like "10:00 AM", "10:00AM", "10 AM", etc.
  const match = time12.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)/i);
  if (!match) {
    // If it's already in 24-hour format (HH:MM), return as is
    if (time12.match(/^\d{1,2}:\d{2}$/)) {
      return time12.length === 4 ? `0${time12}` : time12;
    }
    return "";
  }
  let [, hours, minutes, ampm] = match;
  hours = parseInt(hours, 10);
  minutes = minutes ? parseInt(minutes, 10) : 0;
  if (ampm.toUpperCase() === "PM" && hours !== 12) hours += 12;
  if (ampm.toUpperCase() === "AM" && hours === 12) hours = 0;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

const EditProfile = () => {
  // const User = store.getState().UserSignup

  const router = useRouter();
  const CurrentLanguage = useSelector(CurrentLanguageData);
  const User = useSelector(userSignUpData);
  const UserData = User;
  const fetchFCM = useSelector(Fcmtoken);
  const [formData, setFormData] = useState({
    name: UserData?.name || "",
    email: UserData?.email || "",
    phone: UserData?.mobile || "",
    address: UserData?.address || "",
    notification: UserData?.notification,
    show_personal_details: Number(UserData?.show_personal_details),

    // NEW FIELDS
    store_hours: UserData?.store_hours ? JSON.parse(UserData.store_hours) : {},
    facebook: UserData?.facebook || "",
    twitter: UserData?.twitter || "",
    instagram: UserData?.instagram || "",
    youtube: UserData?.youtube || "",
    slider_images: [], // multiple upload
  });
  const [profileImage, setProfileImage] = useState(UserData?.profile || user);
  const [isLoading, setIsLoading] = useState(false);
  const [profileFile, setProfileFile] = useState(null);
  const [VerificationStatus, setVerificationStatus] = useState("");
  const [RejectionReason, setRejectionReason] = useState("");

  const getVerificationProgress = async () => {
    try {
      const res = await getVerificationStatusApi.getVerificationStatus();
      if (res?.data?.error === true) {
        setVerificationStatus("not applied");
      } else {
        const status = res?.data?.data?.status;
        const rejectReason = res?.data?.data?.rejection_reason;
        setVerificationStatus(status);
        setRejectionReason(rejectReason);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVerificationProgress();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      notification: prevData.notification === 1 ? 0 : 1,
    }));
  };
  const handlePrivateChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      show_personal_details: prevData.show_personal_details === 1 ? 0 : 1,
    }));
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      if (
        formData?.name == "" ||
        formData?.address == "" ||
        formData?.profileFile == ""
      ) {
        toast.error(t("emptyFieldNotAllowed"));
        setIsLoading(false);
        return;
      }
      const response = await updateProfileApi.updateProfile({
        name: formData.name,
        email: formData.email,
        mobile: formData.phone,
        address: formData.address,
        profile: profileFile,
        fcm_id: fetchFCM ? fetchFCM : "",
        notification: formData.notification,
        show_personal_details: formData?.show_personal_details,
        // NEW: store hours
        store_hours: JSON.stringify(formData.store_hours),

        // NEW: social media
        facebook: formData.facebook || "",
        twitter: formData.twitter || "",
        instagram: formData.instagram || "",
        youtube: formData.youtube || "",

        // NEW: Image slider (Base64 array or file array)
        slider_images: formData.slider_images ?? [],
      });

      const data = response.data;
      if (data.error !== true) {
        loadUpdateUserData(data?.data);
        toast.success(data.message);
        setIsLoading(false);
      } else {
        toast.error(data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setIsLoading(true);

  //     try {
  //         if (!formData.name || !formData.address) {
  //             toast.error(t("emptyFieldNotAllowed"));
  //             setIsLoading(false);
  //             return;
  //         }

  //         // ---- BUILD FORM DATA ----
  //         const submitData = new FormData();

  //         submitData.append("name", formData.name);
  //         submitData.append("email", formData.email);
  //         submitData.append("mobile", formData.phone);
  //         submitData.append("address", formData.address);
  //         submitData.append("fcm_id", fetchFCM ? fetchFCM : "");
  //         submitData.append("notification", formData.notification);
  //         submitData.append("show_personal_details", formData.show_personal_details);

  //         // ---- PROFILE IMAGE ----
  //         if (profileFile) {
  //             submitData.append("profile", profileFile);
  //         }

  //         // ---- STORE HOURS JSON ----
  //         if (formData.store_hours) {
  //             submitData.append("store_hours", JSON.stringify(formData.store_hours));
  //         }

  //         // ---- SOCIAL MEDIA ----
  //         submitData.append("facebook", formData.facebook || "");
  //         submitData.append("twitter", formData.twitter || "");
  //         submitData.append("instagram", formData.instagram || "");
  //         submitData.append("youtube", formData.youtube || "");

  //         // ---- SLIDER IMAGES (MULTIPLE) ----
  //         if (formData.slider_images && formData.slider_images.length > 0) {
  //             Array.from(formData.slider_images).forEach((file) => {
  //                 submitData.append("slider_images[]", file);
  //             });
  //         }

  //         // ---- API CALL ----
  //         const response = await updateProfileApi.updateProfile(submitData, {
  //             headers: { "Content-Type": "multipart/form-data" }
  //         });

  //         const data = response.data;

  //         if (data.error !== true) {
  //             loadUpdateUserData(data.data);
  //             toast.success(data.message);
  //         } else {
  //             toast.error(data.message);
  //         }

  //         setIsLoading(false);

  //     } catch (error) {
  //         console.error("Error:", error);
  //         setIsLoading(false);
  //     }
  // };

  const handleVerfiyNow = () => {
    router.push("/user-verification");
  };

  return (
    <>
      <BreadcrumbComponent title2={t("editProfile")} />
      <div className="container">
        <div className="row my_prop_title_spacing">
          <h4 className="pop_cat_head">{t("myProfile")}</h4>
        </div>

        <div className="row profile_sidebar">
          <ProfileSidebar />
          <div className="col-lg-9 p-0">
            <div className="profile_content">
              <div className="userDetCont">
                <div className="user_detail">
                  <div className="profile_image_div">
                    <Image
                      src={profileImage}
                      width={120}
                      height={120}
                      alt="User"
                      className="user_img"
                      onErrorCapture={placeholderImage}
                    />
                    <div className="add_profile">
                      <input
                        type="file"
                        id="profileImageUpload"
                        className="upload_input"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      <label
                        htmlFor="profileImageUpload"
                        className="upload_label"
                      >
                        <MdAddPhotoAlternate size={22} />
                      </label>
                    </div>
                  </div>
                  <div className="user_info">
                    <h5 className="username">{UserData?.name}</h5>
                    <p className="user_email">{UserData?.email}</p>
                  </div>
                </div>

                {/* <button className="verfiyNowBtn pendingVerBtn">{t('pending')}</button> */}

                {VerificationStatus === "approved" ? (
                  <div className="verfied_cont">
                    <MdVerifiedUser size={14} />
                    <p className="verified_text">{t("verified")}</p>
                  </div>
                ) : VerificationStatus === "not applied" ? (
                  <button className="verfiyNowBtn" onClick={handleVerfiyNow}>
                    {t("verfiyNow")}
                  </button>
                ) : VerificationStatus === "rejected" ? (
                  <div className="rejectReasonCont">
                    <p className="rejectedReasonLabel">{RejectionReason}</p>
                    <button
                      className="verfiyNowBtn applyAgain"
                      onClick={handleVerfiyNow}
                    >
                      {t("applyAgain")}
                    </button>
                  </div>
                ) : VerificationStatus === "pending" ||
                  VerificationStatus === "resubmitted" ? (
                  <button className="verfiyNowBtn pendingVerBtn">
                    {t("inReview")}
                  </button>
                ) : null}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="personal_info">
                  <h5 className="personal_info_text">{t("personalInfo")}</h5>
                  <div className="authrow">
                    <div className="auth_in_cont">
                      <label htmlFor="name" className="auth_label">
                        {t("name")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="auth_input personal_info_input"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="privateNotifCont">
                      <div className="auth_in_cont">
                        <label
                          htmlFor="notification"
                          className="auth_pers_label"
                        >
                          {t("notification")}{" "}
                        </label>
                        <span className="switch mt-2">
                          <input
                            id="switch-rounded"
                            type="checkbox"
                            checked={
                              formData.notification === "1" ||
                              formData.notification === 1
                            }
                            onChange={handleToggleChange}
                          />
                          <label htmlFor="switch-rounded"></label>
                        </span>
                      </div>
                      <div className="auth_in_cont">
                        <label
                          htmlFor="showContactInfo"
                          className="auth_pers_label"
                        >
                          {t("showContactInfo")}{" "}
                        </label>
                        <span className="switch mt-2">
                          <input
                            id="showContactInfo"
                            type="checkbox"
                            checked={
                              formData.show_personal_details === "1" ||
                              formData.show_personal_details === 1
                            }
                            onChange={handlePrivateChange}
                          />
                          <label htmlFor="showContactInfo"></label>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="authrow">
                    <div className="auth_in_cont">
                      <label htmlFor="email" className="auth_label">
                        {t("email")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="auth_input personal_info_input"
                        value={formData.email}
                        onChange={handleChange}
                        readOnly={
                          UserData?.type === "email" ||
                          UserData?.type === "google"
                            ? true
                            : false
                        }
                      />
                    </div>
                    <div className="auth_in_cont">
                      <label htmlFor="phone" className="auth_pers_label">
                        {t("phoneNumber")}
                      </label>
                      <input
                        type="number"
                        id="phone"
                        className="auth_input personal_info_input"
                        value={formData.phone}
                        onChange={handleChange}
                        readOnly={UserData?.type === "phone" ? true : false}
                      />
                    </div>
                  </div>
                </div>
                <div className="address">
                  <h5 className="personal_info_text">{t("address")}</h5>
                  <div className="address_wrapper">
                    <div className="auth_in_cont">
                      <label htmlFor="address" className="auth_label">
                        {t("address")}
                      </label>
                      <textarea
                        name="address"
                        id="address"
                        rows="3"
                        className="auth_input personal_info_input"
                        value={formData.address}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
                {/* Custom profile */}
                <div className="store_hours_section">
                  <h5 className="personal_info_text">Store Hours</h5>
                  <div className="store_hours_container">
                    {days.map((day) => {
                      const dayHours = formData.store_hours?.[day] || "";
                      const isClosed =
                        dayHours.toLowerCase() === "closed" || dayHours === "";
                      let openTime24 = "";
                      let closeTime24 = "";

                      if (!isClosed && dayHours.includes(" - ")) {
                        const [openTime12, closeTime12] = dayHours
                          .split(" - ")
                          .map((t) => t.trim());
                        openTime24 = convertTo24Hour(openTime12);
                        closeTime24 = convertTo24Hour(closeTime12);
                      }

                      return (
                        <div key={day} className="store_hours_row">
                          <div className="store_hours_day">
                            <label className="store_hours_day_label">
                              {day}
                            </label>
                          </div>
                          <div className="store_hours_controls">
                            <label className="store_hours_closed_toggle">
                              <input
                                type="checkbox"
                                checked={!isClosed}
                                onChange={(e) => {
                                  const newHours = e.target.checked
                                    ? {
                                        ...formData.store_hours,
                                        [day]: "10:00 AM - 6:00 PM",
                                      }
                                    : {
                                        ...formData.store_hours,
                                        [day]: "Closed",
                                      };
                                  setFormData({
                                    ...formData,
                                    store_hours: newHours,
                                  });
                                }}
                              />
                              <span className="toggle_label">
                                {isClosed ? "Closed" : "Open"}
                              </span>
                            </label>
                            {!isClosed && (
                              <div className="store_hours_time_inputs">
                                <input
                                  type="time"
                                  className="store_hours_time_input"
                                  value={openTime24}
                                  onChange={(e) => {
                                    const time24 = e.target.value;
                                    const formattedTime = time24
                                      ? formatTime12Hour(time24)
                                      : "";
                                    const currentClose = formData.store_hours?.[
                                      day
                                    ]?.includes(" - ")
                                      ? formData.store_hours[day].split(
                                          " - "
                                        )[1]
                                      : "";
                                    const newHours =
                                      formattedTime && currentClose
                                        ? `${formattedTime} - ${currentClose}`
                                        : formattedTime ||
                                          (currentClose
                                            ? `10:00 AM - ${currentClose}`
                                            : "10:00 AM - 6:00 PM");
                                    setFormData({
                                      ...formData,
                                      store_hours: {
                                        ...formData.store_hours,
                                        [day]: newHours,
                                      },
                                    });
                                  }}
                                />
                                <span className="store_hours_separator">
                                  to
                                </span>
                                <input
                                  type="time"
                                  className="store_hours_time_input"
                                  value={closeTime24}
                                  onChange={(e) => {
                                    const time24 = e.target.value;
                                    const formattedTime = time24
                                      ? formatTime12Hour(time24)
                                      : "";
                                    const currentOpen = formData.store_hours?.[
                                      day
                                    ]?.includes(" - ")
                                      ? formData.store_hours[day].split(
                                          " - "
                                        )[0]
                                      : "";
                                    const newHours =
                                      currentOpen && formattedTime
                                        ? `${currentOpen} - ${formattedTime}`
                                        : formattedTime ||
                                          (currentOpen
                                            ? `${currentOpen} - 6:00 PM`
                                            : "10:00 AM - 6:00 PM");
                                    setFormData({
                                      ...formData,
                                      store_hours: {
                                        ...formData.store_hours,
                                        [day]: newHours,
                                      },
                                    });
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="social_media_section">
                  <h5 className="personal_info_text">Social Media Links</h5>
                  <div className="social_media_container">
                    <div className="social_media_input_wrapper">
                      <div className="social_media_icon_wrapper">
                        <FaFacebook className="social_media_icon facebook_icon" />
                      </div>
                      <div className="auth_in_cont social_media_input_cont">
                        <label className="auth_label">Facebook</label>
                        <input
                          type="url"
                          id="facebook"
                          className="auth_input personal_info_input social_media_input"
                          placeholder="https://facebook.com/yourpage"
                          value={formData.facebook || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="social_media_input_wrapper">
                      <div className="social_media_icon_wrapper">
                        <FaSquareXTwitter className="social_media_icon twitter_icon" />
                      </div>
                      <div className="auth_in_cont social_media_input_cont">
                        <label className="auth_label">Twitter</label>
                        <input
                          type="url"
                          id="twitter"
                          className="auth_input personal_info_input social_media_input"
                          placeholder="https://twitter.com/yourhandle"
                          value={formData.twitter || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="social_media_input_wrapper">
                      <div className="social_media_icon_wrapper">
                        <FaInstagram className="social_media_icon instagram_icon" />
                      </div>
                      <div className="auth_in_cont social_media_input_cont">
                        <label className="auth_label">Instagram</label>
                        <input
                          type="url"
                          id="instagram"
                          className="auth_input personal_info_input social_media_input"
                          placeholder="https://instagram.com/yourprofile"
                          value={formData.instagram || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="social_media_input_wrapper">
                      <div className="social_media_icon_wrapper">
                        <FaYoutube className="social_media_icon youtube_icon" />
                      </div>
                      <div className="auth_in_cont social_media_input_cont">
                        <label className="auth_label">YouTube</label>
                        <input
                          type="url"
                          id="youtube"
                          className="auth_input personal_info_input social_media_input"
                          placeholder="https://youtube.com/@yourchannel"
                          value={formData.youtube || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="slider_images_section">
                  <h5 className="personal_info_text">Seller Image Slider</h5>

                  <input
                    type="file"
                    multiple
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        slider_images: [...e.target.files], // OR convert to Base64
                      });
                    }}
                  />

                  <div className="preview_slider">
                    {formData.slider_images?.length > 0 &&
                      Array.from(formData.slider_images).map((file, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(file)}
                          width={80}
                          height={80}
                          className="slider_thumb"
                        />
                      ))}
                  </div>
                </div>
                {/* end custom profile */}

                {isLoading ? (
                  <button className="sv_chng_btn">
                    <div className="loader-container-otp">
                      <div className="loader-otp"></div>
                    </div>
                  </button>
                ) : (
                  <button type="submit" className="sv_chng_btn">
                    {t("saveChanges")}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
