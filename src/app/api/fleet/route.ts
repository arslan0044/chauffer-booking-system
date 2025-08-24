import { connect } from "../../../dbConfig/dbConfig";
import Service from "../../../models/fleetModel";
import path from "path";
connect();
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";

export async function GET() {
  try {
    const data = await Service.find();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const { doors, model, price, seats, type, img } = data;
    const byteLength = await img.arrayBuffer();
    const bufferData = Buffer.from(byteLength);
    const pathOfImage = `./public/FleetsImages/${path.basename(img.name)}`;
    // const img = ""
    // writeFile(pathOfImage, bufferData);
    console.log(pathOfImage, bufferData);

    const newService = new Service({
      model,
      price,
      type,
      doors,
      seats,
      img:pathOfImage,
    });
    const savedService = await newService.save();
    console.log(savedService);

    return NextResponse.json({
      message: "Service created successfully",
      success: true,
      savedService,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
