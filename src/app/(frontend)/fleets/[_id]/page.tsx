import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getFleetById } from '@/lib/actions';
import FleetDetailClient from './FleetDetailClient';

interface PageProps {
  params: {
    _id: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const result = await getFleetById(params._id);
  
  if (!result.success || !result.data) {
    return {
      title: 'Fleet Not Found | Luxury Chauffeur',
      description: 'The requested fleet vehicle could not be found.'
    };
  }

  const fleet = result.data;
  const thumbnailImage = fleet.images?.find((img: any) => img.isThumbnail);
  const imageUrl = thumbnailImage?.url || fleet.images?.[0]?.url;

  return {
    title: `${fleet.make} ${fleet.model} ${fleet.year} - ${fleet.category} ${fleet.vehicleType} | Luxury Chauffeur`,
    description: fleet.description || `Luxury ${fleet.category} ${fleet.vehicleType} - ${fleet.make} ${fleet.model} ${fleet.year}. Starting at $${fleet.basePricePerHour}/hour. ${fleet.seats} seats, ${fleet.doors} doors, ${fleet.transmission} transmission.`,
    keywords: `${fleet.make}, ${fleet.model}, ${fleet.vehicleType}, ${fleet.category}, luxury chauffeur, car rental, ${fleet.fuelType}, ${fleet.transmission}`,
    openGraph: {
      title: `${fleet.make} ${fleet.model} ${fleet.year} - Luxury Chauffeur`,
      description: fleet.description || `Luxury ${fleet.category} ${fleet.vehicleType} available for booking`,
      images: imageUrl ? [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: `${fleet.make} ${fleet.model} ${fleet.year}`
      }] : [],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${fleet.make} ${fleet.model} ${fleet.year}`,
      description: fleet.description || `Luxury ${fleet.category} ${fleet.vehicleType}`,
      images: imageUrl ? [imageUrl] : []
    },
    alternates: {
      canonical: `/fleets/${params._id}`
    }
  };
}

// Server component for data fetching
export default async function FleetDetailPage({ params }: PageProps) {
  const result = await getFleetById(params._id);
  
  if (!result.success || !result.data) {
    notFound();
  }

  const fleet = result.data;

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${fleet.make} ${fleet.model} ${fleet.year}`,
    "description": fleet.description || `Luxury ${fleet.category} ${fleet.vehicleType}`,
    "brand": {
      "@type": "Brand",
      "name": fleet.make
    },
    "model": fleet.model,
    "vehicleModelDate": fleet.year,
    "category": fleet.category,
    "offers": {
      "@type": "Offer",
      "price": fleet.basePricePerHour,
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": fleet.basePricePerHour,
        "priceCurrency": "USD",
        "unitText": "per hour"
      },
      "availability": fleet.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    },
    "image": fleet.images?.map((img: any) => img.url) || [],
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Seats",
        "value": fleet.seats
      },
      {
        "@type": "PropertyValue",
        "name": "Doors",
        "value": fleet.doors
      },
      {
        "@type": "PropertyValue",
        "name": "Transmission",
        "value": fleet.transmission
      },
      {
        "@type": "PropertyValue",
        "name": "Fuel Type",
        "value": fleet.fuelType
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <FleetDetailClient fleet={fleet} />
    </>
  );
}