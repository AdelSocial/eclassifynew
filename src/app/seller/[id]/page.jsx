import SellerProfile from "@/components/PagesComponent/SellerProfile/SellerProfile"
import axios from "axios";


export const generateMetadata = async ({ params }) => {
    try {

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_END_POINT}get-seller?id=${params?.id}`
        );

        const seller = response?.data.data?.seller
        const title = seller?.name
        const image = seller?.profile

        return {
            title: title ? title : process.env.NEXT_PUBLIC_META_TITLE,
            description: process.env.NEXT_PUBLIC_META_DESCRIPTION,
            openGraph: {
                images: image ? [image] : [],
            },
            keywords: process.env.NEXT_PUBLIC_META_kEYWORDS
        };
    } catch (error) {
        console.error("Error fetching MetaData:", error);
        return null;
    }
};



const SellerProfilePage = async ({ params }) => {
    // Ensure params is resolved (Next.js 15+)
    const resolvedParams = await params;
    const sellerId = resolvedParams?.id;

    if (!sellerId) {
        return <div>Invalid seller ID</div>;
    }

    return (
        <SellerProfile id={sellerId} />
    )
}

export default SellerProfilePage