import dotenv from "dotenv";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

dotenv.config();
// console.log(process.env.SMTP_HOST)

const SMTP_USER = "bumihouseke@gmail.com"
const SMTP_PASS = "igzf wldv tqnx yydl"
const SMTP_PORT = 587
const SMTP_SERVICE = "gmail"
const SMTP_HOST = "smtp.gmail.com"

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT || 587,
    service:   SMTP_SERVICE,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});

// Render an EJS email template
const renderEmailTemplate = async(templateName: string, data:Record<string,any>): Promise <string> =>{
    const templatePath = path.join(
        process.cwd(),
        "apps",
        "auth-service",
        "src",
        "utils",
        "email-templates",
        `${templateName}.ejs`
    );
    return ejs.renderFile(templatePath, data)
};

// send an email using nodemailer
export const sendEmail = async(
    to:string,
     subject: string,
      templateName:string, 
      data: Record<string, any>
    ) => { 
        try {
        const html = await renderEmailTemplate(templateName, data);
        await transporter.sendMail({
            from: `<${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
        });
        return true;
        
    } catch (error) {
        console.log("Error sending email", error);
        return false;
    }
}
