package com.example.demo.messaging;

import com.example.demo.model.Employee;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
@RabbitListener(queues = "employee_queue") 
public class EmployeeConsumer {

    private final JavaMailSender mailSender;

    @RabbitHandler 
    public void consumeEmployeeEvent(Employee employee) {
        log.info("SLF4J Log -> Received Employee event (Create/Update) from RabbitMQ for: {} {}", 
                employee.getFirstName(), employee.getLastName());

        sendEmail(
            employee.getEmail(),
            "Personnel Record Updated",
            "Hello " + employee.getFirstName() + ",\n\nYour personnel information has been successfully created/updated in the system.\n\nBest regards,\nHR Team"
        );
    }

    @RabbitHandler 
    public void consumeDeleteEvent(Integer id) {
        log.info("SLF4J Log -> Received Employee deletion event from RabbitMQ for ID: {}", id);
        // Deletion events only carry the ID, so no target email is available unless queried from DB prior to deletion.
    }

    private void sendEmail(String to, String subject, String body) {
        if (to == null || to.isBlank()) {
            log.warn("Skipping email dispatch: No recipient email provided.");
            return;
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("hr-system@company.com");
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);
            log.info("Notification email dispatched to Mailtrap for: {}", to);
        } catch (Exception e) {
            log.error("Failed to send email via Mailtrap to {}: {}", to, e.getMessage(), e);
        }
    }
}
/*package com.example.demo.messaging;

import com.example.demo.model.Employee;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
 
@Service
@Slf4j
@RabbitListener(queues = "employee_queue") 
public class EmployeeConsumer {

    @RabbitHandler 
    public void consumeEmployeeEvent(Employee employee) {
        log.info("SLF4J Log -> Received Employee event (Create/Update) from RabbitMQ for: {} {}", 
                employee.getFirstName(), employee.getLastName());
    }

    @RabbitHandler 
    public void consumeDeleteEvent(Integer id) {
        log.info("SLF4J Log -> Received Employee deletion event from RabbitMQ for ID: {}", id);
    }
}*/