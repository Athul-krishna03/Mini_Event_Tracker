import QRCode from "qrcode";
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME!,
    api_key: process.env.CLOUD_KEY!,
    api_secret: process.env.CLOUD_SECRET!,
});

export const generateQRCode = async (data: string): Promise<string> => {
    try {
        const qrCode = await QRCode.toDataURL(data);
        return qrCode;
    } catch (error) {
        throw new Error("Failed to generate QR code");
    }
};

export const uploadToCloudinary = async (file: string): Promise<string> => {
    try {
        const uploadRes = await cloudinary.v2.uploader.upload(file, {
            folder: "tickets",
        });
        return uploadRes.secure_url;
    } catch (error) {
        throw new Error("Failed to upload to Cloudinary");
    }
};
