const fs = require('fs') 
const path = require('path')
const handlebars = require('hbs')
const nodemailer = require('nodemailer')

const getEmail = ({headerText,recipientName,bodyText,buttonLink,buttonText}) => {
    try{
    const templateSource = fs.readFileSync(path.join(__dirname,'../Mail/passwordChange.hbs'),'utf-8')
    const template = handlebars.compile(templateSource)
    const hbsEmailFormat=template({headerText,recipientName,bodyText,buttonLink,buttonText})
    return hbsEmailFormat
    }
    catch(error){
        console.log("getEmail => "+error.message)
    }
}

const sendEmail = async (email,otp) => {
    
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'abc@gmail.com', 
                pass: 'abc', 
            }
        });
    
        const htmlContent = getEmail({
            headerText: 'Thank You for Choosing Us',
            recipientName: `user`,
            bodyText: `OTP   ${otp}`,
            buttonLink: `http://localhost:5173/reset-password?email=${encodeURIComponent(email)}`,
            buttonText: 'Change Password'
        });
    
        const mailOptions = {
            from: {
                name: 'CAR BOOK',
                address: 'abc@gmail.com', 
            },
            to: email+"", 
            subject: 'Change Password Request',
            html: htmlContent, 
        };
        
        return await transporter.sendMail(mailOptions);
    }
    catch(error){
        console.log("error : "+error.message)
    }
}

module.exports = sendEmail
