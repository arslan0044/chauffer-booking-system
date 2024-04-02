import { connect } from "../../../dbConfig/dbConfig";
import Gallery from "../../../models/galleryModel";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
connect();
export async function GET() {
  try {
    const data = await Gallery.find();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.massage }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  try {
    const file = await req.formData();
    const image: any = file.get("image");
    const byteLength = await image.arrayBuffer();
    const bufferData = Buffer.from(byteLength);
    const pathOfImage = `./public/Galleryimages/${path.basename(image.name)}`;

    writeFile(pathOfImage, bufferData);

    const imgData = {
      img: `/Galleryimages/${path.basename(image.name)}`,
    };
    const data = imgData;
    const { img } = data;
    const newIMG = new Gallery({
      img,
    });
    const savedGallery = await newIMG.save();
    return NextResponse.json({
      message: "Image successfully add in Gallery",
      success: true,
      savedGallery,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.massage });
  }
}
