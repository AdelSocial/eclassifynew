"use client"
import dynamic from 'next/dynamic'

const AdListing = dynamic(() => import('@/components/PagesComponent/AdListing/AdListing'), { ssr: false })

const AdListingClient = () => {
    return <AdListing />
}

export default AdListingClient

