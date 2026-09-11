package com.example.demo.messaging;

import com.example.demo.model.Employee;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
 
@Service
@RequiredArgsConstructor
@Slf4j 
public class EmployeeProducer {

    @Value("${rabbitmq.exchange.name}")
    private String exchangeName;

    @Value("${rabbitmq.routing.key}")
    private String routingKey;

    private final RabbitTemplate rabbitTemplate;

    public void sendEmployeeUpdatedEvent(Employee employee) {
        log.info("SLF4J Log -> Publishing employee update event for ID: {}", employee.getId());
        rabbitTemplate.convertAndSend(exchangeName, routingKey, employee);
    }

    public void sendEmployeeDeletedEvent(Integer id) {
        log.info("SLF4J Log -> Publishing employee deletion event for ID: {}", id);
        rabbitTemplate.convertAndSend(exchangeName, routingKey, id);
    }
    
    public void sendEmployeeCreatedEvent(Employee employee) {
        log.info("SLF4J Log -> Publishing employee creation event for ID: {}", employee.getId());
        rabbitTemplate.convertAndSend(exchangeName, routingKey, employee);
    }
}