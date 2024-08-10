package com.java.hminhhoangdev.service.impl;

import com.java.hminhhoangdev.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.List;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendOrderConfirmationEmail(String email, int orderId, String fullName, String phone, String shippingAddress, double price, List<MultipartFile> productImages) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(email);
            helper.setSubject("GEARVN - ĐẶT HÀNG THÀNH CÔNG (Mã đơn hàng #" + orderId + ")");

            StringBuilder emailContent = new StringBuilder();
            emailContent.append("<html><body>");
            emailContent.append("<h3>Cảm ơn bạn đã đặt hàng tại GEARVN!</h3>");
            emailContent.append("<p>Đây là chi tiết đơn hàng của bạn:</p>");
            emailContent.append("<table style='width:100%; border-collapse: collapse;'>");
            emailContent.append("<tr><td>Mã đơn hàng:</td><td><strong>#").append(orderId).append("</strong></td></tr>");
            emailContent.append("<tr><td>Khách hàng:</td><td>").append(fullName).append("</td></tr>");
            emailContent.append("<tr><td>Số điện thoại:</td><td>").append(phone).append("</td></tr>");
            emailContent.append("<tr><td>Email:</td><td>").append(email).append("</td></tr>");
            emailContent.append("<tr><td>Giao đến:</td><td>").append(shippingAddress).append("</td></tr>");
            emailContent.append("<tr><td>Tổng tiền:</td><td style='color: #e30019;'><strong>").append(String.format("%,.0f", price)).append(" ₫</strong></td></tr>");
            emailContent.append("</table>");
            emailContent.append("</body></html>");

            helper.setText(emailContent.toString(), true);

            for (int i = 0; i < productImages.size(); i++) {
                MultipartFile file = productImages.get(i);
                String filename = "product-image-" + (i + 1) + ".jpg";
                ByteArrayResource resource = new ByteArrayResource(file.getBytes());
                helper.addAttachment(filename, resource);
            }

            mailSender.send(message);
        } catch (MessagingException e) {
            System.err.println("Failed to send email: " + e.getMessage());
        } catch (IOException e) {
            System.err.println("Error reading product images: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("An error occurred: " + e.getMessage());
        }
    }
}
